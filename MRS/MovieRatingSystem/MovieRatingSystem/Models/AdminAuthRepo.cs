using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MovieRatingSystem.Models
{
    public class AdminAuthRepo : IAdminAuthRepo
    {
        private readonly MovieRatingDbContext _context;
        private readonly IConfiguration _configuration;

        public AdminAuthRepo(MovieRatingDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<bool> AdminExists(string adminName, string aEmail)
        {
            if (await _context.User.AnyAsync(u => u.userName.ToLower() == adminName.ToLower() || u.uEmail.ToLower() == aEmail.ToLower()))
            {
                return true;
            }
            if (await _context.Admin.AnyAsync(a => a.adminName.ToLower() == adminName.ToLower() || a.aEmail.ToLower() == aEmail.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<string?> Login(string adminName, string password)
        {
            var admin = await _context.Admin.FirstOrDefaultAsync(a => a.adminName.ToLower() == adminName.ToLower());
            if (admin == null)
            {
                return null;
            }
            else if (!VerifyPasswordHash(password, admin.PasswordHash, admin.PasswordSalt))
            {
                return null;
            }
            else
            {
                return CreateToken(admin);
            }
        }

        public async Task<int> Register(Admin admin, string password)
        {
            if (await AdminExists(admin.adminName,admin.aEmail))
            {
                return 0;
            }
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            admin.PasswordHash = passwordHash;
            admin.PasswordSalt = passwordSalt;

            _context.Admin.Add(admin);
            await _context.SaveChangesAsync();
            return admin.adminId;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private string CreateToken(Admin admin)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,admin.adminId.ToString()),
                new Claim(ClaimTypes.Name,admin.adminName),
                new Claim(ClaimTypes.Role,"Admin")
            };
            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken == null)
            {
                throw new Exception("AppSettings Token is null");
            }
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));

            SigningCredentials signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512);

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

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }

    }
}
