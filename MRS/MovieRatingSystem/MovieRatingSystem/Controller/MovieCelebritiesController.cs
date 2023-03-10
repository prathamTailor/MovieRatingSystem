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
    public class MovieCelebritiesController : ControllerBase
    {
        private readonly MovieRatingDbContext _context;

        public MovieCelebritiesController(MovieRatingDbContext context)
        {
            _context = context;
        }

        // GET: api/MovieCelebrities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieCelebrity>>> GetMovieCelebrities()
        {
          if (_context.MovieCelebrities == null)
          {
              return NotFound();
          }
            return await _context.MovieCelebrities.ToListAsync();
        }

        // GET: api/MovieCelebrities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieCelebrity>> GetMovieCelebrity(int id)
        {
          if (_context.MovieCelebrities == null)
          {
              return NotFound();
          }
            var movieCelebrity = await _context.MovieCelebrities.FindAsync(id);

            if (movieCelebrity == null)
            {
                return NotFound();
            }

            return movieCelebrity;
        }

        // PUT: api/MovieCelebrities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieCelebrity(int id, MovieCelebrity movieCelebrity)
        {
            if (id != movieCelebrity.movieCelebrityId)
            {
                return BadRequest();
            }

            _context.Entry(movieCelebrity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieCelebrityExists(id))
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

        // POST: api/MovieCelebrities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MovieCelebrity>> PostMovieCelebrity(MovieCelebrity movieCelebrity)
        {
          if (_context.MovieCelebrities == null)
          {
              return Problem("Entity set 'MovieRatingDbContext.MovieCelebrities'  is null.");
          }
            _context.MovieCelebrities.Add(movieCelebrity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieCelebrity", new { id = movieCelebrity.movieCelebrityId }, movieCelebrity);
        }

        // DELETE: api/MovieCelebrities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieCelebrity(int id)
        {
            if (_context.MovieCelebrities == null)
            {
                return NotFound();
            }
            var movieCelebrity = await _context.MovieCelebrities.FindAsync(id);
            if (movieCelebrity == null)
            {
                return NotFound();
            }

            _context.MovieCelebrities.Remove(movieCelebrity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieCelebrityExists(int id)
        {
            return (_context.MovieCelebrities?.Any(e => e.movieCelebrityId == id)).GetValueOrDefault();
        }
    }
}
