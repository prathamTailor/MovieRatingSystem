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
    public class MovieRolesController : ControllerBase
    {
        private readonly MovieRatingDbContext _context;

        public MovieRolesController(MovieRatingDbContext context)
        {
            _context = context;
        }

        // GET: api/MovieRoles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieRole>>> GetMovieRoles()
        {
          if (_context.MovieRoles == null)
          {
              return NotFound();
          }
            return await _context.MovieRoles.ToListAsync();
        }

        // GET: api/MovieRoles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieRole>> GetMovieRole(int id)
        {
          if (_context.MovieRoles == null)
          {
              return NotFound();
          }
            var movieRole = await _context.MovieRoles.FindAsync(id);

            if (movieRole == null)
            {
                return NotFound();
            }

            return movieRole;
        }

        // PUT: api/MovieRoles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieRole(int id, MovieRole movieRole)
        {
            if (id != movieRole.movieRoleId)
            {
                return BadRequest();
            }

            _context.Entry(movieRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieRoleExists(id))
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

        // POST: api/MovieRoles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MovieRole>> PostMovieRole(MovieRole movieRole)
        {
          if (_context.MovieRoles == null)
          {
              return Problem("Entity set 'MovieRatingDbContext.MovieRoles'  is null.");
          }
            _context.MovieRoles.Add(movieRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieRole", new { id = movieRole.movieRoleId }, movieRole);
        }

        // DELETE: api/MovieRoles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieRole(int id)
        {
            if (_context.MovieRoles == null)
            {
                return NotFound();
            }
            var movieRole = await _context.MovieRoles.FindAsync(id);
            if (movieRole == null)
            {
                return NotFound();
            }

            _context.MovieRoles.Remove(movieRole);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieRoleExists(int id)
        {
            return (_context.MovieRoles?.Any(e => e.movieRoleId == id)).GetValueOrDefault();
        }
    }
}
