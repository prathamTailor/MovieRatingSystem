using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MovieRatingSystem.Models
{
    public class AuthRepo : IAuthRepo
    {
        private readonly MovieRatingDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthRepo(MovieRatingDbContext context,IConfiguration configuration) { 
            _context = context;
            _configuration = configuration;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,user.userId.ToString()),
                new Claim(ClaimTypes.Name,user.userName),
                new Claim(ClaimTypes.Role,"User")
            };
            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken == null) {
                throw new Exception("AppSettings Token is null");
            }
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));

            SigningCredentials signingCredentials = new SigningCredentials(symmetricSecurityKey,SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = signingCredentials
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }

        public async Task<string?> Login(string username, string password)
        {
            var user = await _context.User.FirstOrDefaultAsync(u => u.userName.ToLower() == username.ToLower());
            if (user == null)
            {
                return null;
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            else { 
                return CreateToken(user);
            }
        }

        public async Task<int> Register(User user, string password)
        {
            if (await UserExists(user.userName)) {
                return 0;
            }
            CreatePasswordHash(password,out byte[] passwordHash,out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return user.userId;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.User.AnyAsync(u => u.userName.ToLower() == username.ToLower())) {
                return true;
            }
            return false;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)) {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }
    }
}
