using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRatingSystem.Models;

namespace MovieRatingSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CelebrityRolesController : ControllerBase
    {
        private readonly MovieRatingDbContext _context;

        public CelebrityRolesController(MovieRatingDbContext context)
        {
            _context = context;
        }

        // GET: api/CelebrityRoles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CelebrityRole>>> GetCelebrityRoles()
        {
          if (_context.CelebrityRoles == null)
          {
              return NotFound();
          }
            return await _context.CelebrityRoles.ToListAsync();
        }

        // GET: api/CelebrityRoles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CelebrityRole>> GetCelebrityRole(int id)
        {
          if (_context.CelebrityRoles == null)
          {
              return NotFound();
          }
            var celebrityRole = await _context.CelebrityRoles.FindAsync(id);

            if (celebrityRole == null)
            {
                return NotFound();
            }

            return celebrityRole;
        }

        // PUT: api/CelebrityRoles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCelebrityRole(int id, CelebrityRole celebrityRole)
        {
            if (id != celebrityRole.celebrityRoleId)
            {
                return BadRequest();
            }

            _context.Entry(celebrityRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CelebrityRoleExists(id))
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

        // POST: api/CelebrityRoles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CelebrityRole>> PostCelebrityRole(CelebrityRole celebrityRole)
        {
          if (_context.CelebrityRoles == null)
          {
              return Problem("Entity set 'MovieRatingDbContext.CelebrityRoles'  is null.");
          }
            _context.CelebrityRoles.Add(celebrityRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCelebrityRole", new { id = celebrityRole.celebrityRoleId }, celebrityRole);
        }

        // DELETE: api/CelebrityRoles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCelebrityRole(int id)
        {
            if (_context.CelebrityRoles == null)
            {
                return NotFound();
            }
            var celebrityRole = await _context.CelebrityRoles.FindAsync(id);
            if (celebrityRole == null)
            {
                return NotFound();
            }

            _context.CelebrityRoles.Remove(celebrityRole);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CelebrityRoleExists(int id)
        {
            return (_context.CelebrityRoles?.Any(e => e.celebrityRoleId == id)).GetValueOrDefault();
        }
    }
}
