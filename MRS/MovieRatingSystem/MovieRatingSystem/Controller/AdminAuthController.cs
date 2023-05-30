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
    public class AdminAuthController : ControllerBase
    {
        private readonly IAdminAuthRepo _adminAuthRepo;
        private readonly MovieRatingDbContext _context;
        private readonly IMapper _mapper;

        public AdminAuthController(IAdminAuthRepo adminAuthRepo, MovieRatingDbContext context,IMapper mapper) { 
            _adminAuthRepo = adminAuthRepo;
            _context = context;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult> Register(AdminRegisterDTO adminDTO)
        {

            var admin = new Admin();
            admin.adminName = adminDTO.adminName;
            admin.aEmail = adminDTO.aEmail;
            admin.aFirstName = adminDTO.aFirstName;
            admin.aLastName = adminDTO.aLastName;
            admin.aMiddleName = adminDTO.aMiddleName;
            admin.aGender = adminDTO.aGender;
            admin.aDOB = adminDTO.aDOB;
            admin.aCity = adminDTO.aCity;
            admin.aCountry = adminDTO.aCountry;
            admin.imgUrl = adminDTO.imgUrl;

            var res = await _adminAuthRepo.Register(admin, adminDTO.password);
            if (res == 0)
            {
                return BadRequest($"Cannot register {adminDTO.adminName}");
            }
            return Ok($"User registered successfully!");
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult> Login(AdminLoginDTO adminDTO)
        {
            var res = await _adminAuthRepo.Login(adminDTO.adminName, adminDTO.password);
            if (res == null)
            {
                return BadRequest($"Incorrect username or password");
            }
            Response.Cookies.Append("AdminToken", res, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            return Ok(res);
        }

        // GET: api/AdminAuth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmin()
        {
            if (_context.Admin == null)
            {
                return NotFound();
            }

            var res = await _context.Admin.ToListAsync();
            return Ok(_mapper.Map<List<AdminDTO>>(res));
        }

        // GET: api/AdminAuth/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDTO>> GetAdmin(int id)
        {
            if (_context.Admin == null)
            {
                return NotFound();
            }
            var admin = await _context.Admin.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            var adminDTO =  _mapper.Map<AdminDTO>(admin);
            return Ok(adminDTO);
        }

        [HttpGet("me")]
        public async Task<ActionResult<string>> LoadAdmin()
        {
            if (Request.Cookies["AdminToken"] == null)
            {
                return BadRequest("Coocie Not Found");
            }

            var res = Request.Cookies["AdminToken"];

            return res;
        }

        [HttpGet("logout")]
        public async Task<ActionResult<string>> Logout()
        {
            if (Request.Cookies["AdminToken"] != null)
            {
                Response.Cookies.Append("AdminToken", "null", new CookieOptions() { Expires = DateTime.Now.AddDays(-1), HttpOnly = true, SameSite = SameSiteMode.Strict });
                return Ok("Loged out successfully");
            }
            return BadRequest("Some problem in Loged out");
        }

        // PUT: api/AdminAuth/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(int id, AdminDTO adminDTO)
        {
            if (id != adminDTO.adminId)
            {
                return BadRequest();
            }

            //_context.Entry(admin).State = EntityState.Modified;
            var admin = await _context.Admin.FindAsync(id);
            if (admin == null) { 
                return NotFound();
            }

            _mapper.Map<AdminDTO,Admin>(adminDTO,admin);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
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

        // DELETE: api/AdminAuth/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            if (_context.Admin == null)
            {
                return NotFound();
            }
            var admin = await _context.Admin.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            _context.Admin.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminExists(int id)
        {
            return (_context.Admin?.Any(e => e.adminId == id)).GetValueOrDefault();
        }

    }
}
