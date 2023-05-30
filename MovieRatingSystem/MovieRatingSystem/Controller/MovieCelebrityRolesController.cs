using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRatingSystem.DTOs;
using MovieRatingSystem.Models;

namespace MovieRatingSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieCelebrityRolesController : ControllerBase
    {
        private readonly MovieRatingDbContext _context;

        public MovieCelebrityRolesController(MovieRatingDbContext context)
        {
            _context = context;
        }

        // GET: api/MovieCelebrityRoles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieCelebrityRole>>> GetMovieCelebrityRoles()
        {
          if (_context.MovieCelebrityRoles == null)
          {
              return NotFound();
          }
            return await _context.MovieCelebrityRoles.ToListAsync();
        }

        // GET: api/MovieCelebrityRoles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieCelebrityRole>> GetMovieCelebrityRole(int id)
        {
          if (_context.MovieCelebrityRoles == null)
          {
              return NotFound();
          }
            var movieCelebrityRole = await _context.MovieCelebrityRoles.FindAsync(id);

            if (movieCelebrityRole == null)
            {
                return NotFound();
            }

            return movieCelebrityRole;
        }

        // GET: api/MovieCelebrityRoles/MovieId/5
        [HttpGet("MovieId/{id}")]
        public async Task<ActionResult<IEnumerable<CelebrityRoleOfMovieDTO>>> GetMovieCelebrityRoleOfMovie(int id)
        {
            if (_context.MovieCelebrityRoles == null)
            {
                return NotFound();
            }
            var movieCelebrityRole = await _context.MovieCelebrityRoles.Where(x => x.movieId == id).ToListAsync();

            if (movieCelebrityRole == null)
            {
                return NotFound();
            }

            var celebrityRoleOfMovie = new List<CelebrityRoleOfMovieDTO>();
            foreach (MovieCelebrityRole mcr in movieCelebrityRole) {
                var c = await _context.Celebrity.FindAsync(mcr.celebrityId);
                var r = await _context.Role.FindAsync(mcr.roleId);
                
                var cr = new CelebrityRoleOfMovieDTO();
                
                cr.celebrityId = c.celebrityId;
                cr.celebrityName = c.celebrityName;
                cr.gender = c.gender;
                cr.dob = c.dob;
                cr.birthPlace = c.birthPlace;
                cr.imgUrl = c.imgUrl;

                cr.roleId = r.roleId;
                cr.roleName = r.roleName;
                cr.roleDescription= r.roleDescription;

                celebrityRoleOfMovie.Add(cr);
            }

            return celebrityRoleOfMovie;
        }

        // PUT: api/MovieCelebrityRoles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieCelebrityRole(int id, MovieCelebrityRole movieCelebrityRole)
        {
            if (id != movieCelebrityRole.movieCelebrityRoleId)
            {
                return BadRequest();
            }

            _context.Entry(movieCelebrityRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieCelebrityRoleExists(id))
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

        // POST: api/MovieCelebrityRoles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MovieCelebrityRole>> PostMovieCelebrityRole(MovieCelebrityRole movieCelebrityRole)
        {
          if (_context.MovieCelebrityRoles == null)
          {
              return Problem("Entity set 'MovieRatingDbContext.MovieCelebrityRoles'  is null.");
          }
            _context.MovieCelebrityRoles.Add(movieCelebrityRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieCelebrityRole", new { id = movieCelebrityRole.movieCelebrityRoleId }, movieCelebrityRole);
        }

        // DELETE: api/MovieCelebrityRoles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieCelebrityRole(int id)
        {
            if (_context.MovieCelebrityRoles == null)
            {
                return NotFound();
            }
            var movieCelebrityRole = await _context.MovieCelebrityRoles.FindAsync(id);
            if (movieCelebrityRole == null)
            {
                return NotFound();
            }

            _context.MovieCelebrityRoles.Remove(movieCelebrityRole);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieCelebrityRoleExists(int id)
        {
            return (_context.MovieCelebrityRoles?.Any(e => e.movieCelebrityRoleId == id)).GetValueOrDefault();
        }
    }
}
