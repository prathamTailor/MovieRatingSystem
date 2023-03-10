using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRatingSystem.DTOs;
using MovieRatingSystem.Models;

namespace MovieRatingSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepo _authRepo;
        private readonly MovieRatingDbContext _context;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepo authRepo, MovieRatingDbContext context, IMapper mapper) { 
            _authRepo= authRepo;
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(UserRegisterDTO userDTO) {
            var user = new User();
            user.userName = userDTO.userName;
            user.uEmail= userDTO.uEmail;
            user.uFirstName= userDTO.uFirstName;
            user.uMiddleName= userDTO.uMiddleName;
            user.uLastName= userDTO.uLastName;
            user.uDOB= userDTO.uDOB;
            user.uGender = userDTO.uGender;
            user.uCity = userDTO.uCity;
            user.uCountry = userDTO.uCountry;
            user.imgUrl = userDTO.imgUrl;
            var res = await _authRepo.Register(user,userDTO.password);
            if (res == 0)
            {
                return BadRequest($"Cannot register {userDTO.userName}");
            }
            return Ok($"User registered successfully!");
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(UserLoginDTO userDTO)
        {
            var res = await _authRepo.Login(userDTO.userName,userDTO.password);
            if (res == null) {
                return BadRequest($"Incorrect username or password");
            }
            return Ok(res);
        }

        // GET: api/Auth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUser()
        {
            if (_context.User == null)
            {
                return NotFound();
            }

            var res = await _context.User.ToListAsync();
            return Ok(_mapper.Map<List<UserDTO>>(res));
        }

        // GET: api/Auth/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var userDTO = _mapper.Map<UserDTO>(user);
            return Ok(userDTO);
        }

        // PUT: api/Auth/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDTO userDTO)
        {
            if (id != userDTO.userId)
            {
                return BadRequest();
            }

            //_context.Entry(admin).State = EntityState.Modified;
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _mapper.Map<UserDTO, User>(userDTO, user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Auth/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.User?.Any(e => e.userId == id)).GetValueOrDefault();
        }

    }
}
