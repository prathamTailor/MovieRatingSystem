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
    public class CelebritiesController : ControllerBase
    {
        private readonly MovieRatingDbContext _context;

        public CelebritiesController(MovieRatingDbContext context)
        {
            _context = context;
        }

        // GET: api/Celebrities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Celebrity>>> GetCelebrity()
        {
          if (_context.Celebrity == null)
          {
              return NotFound();
          }
            return await _context.Celebrity.ToListAsync();
        }

        // GET: api/Celebrities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Celebrity>> GetCelebrity(int id)
        {
          if (_context.Celebrity == null)
          {
              return NotFound();
          }
            var celebrity = await _context.Celebrity.FindAsync(id);

            if (celebrity == null)
            {
                return NotFound();
            }

            return celebrity;
        }

        //// GET: api/Celebrities/5
        //[HttpGet("Movie/{id}")]
        //public async Task<ActionResult<IEnumerable<Celebrity>>> GetCelebrityOfMovie(int id)
        //{
        //    if (_context.Celebrity == null)
        //    {
        //        return NotFound();
        //    }
        //    var movieCelebrity = await _context.MovieCelebrities.Where(x => x.movieId == id).ToListAsync();

        //    List<Celebrity> celebrity = new List<Celebrity>();
        //    foreach (MovieCelebrity mc in movieCelebrity) {
        //        var c = await _context.Celebrity.FindAsync(mc.celebrityId);
        //        celebrity.Add(c);
        //    }

        //    return celebrity;
        //}

        // PUT: api/Celebrities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCelebrity(int id, Celebrity celebrity)
        {
            if (id != celebrity.celebrityId)
            {
                return BadRequest();
            }

            _context.Entry(celebrity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CelebrityExists(id))
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

        // POST: api/Celebrities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Celebrity>> PostCelebrity(Celebrity celebrity)
        {
          if (_context.Celebrity == null)
          {
              return Problem("Entity set 'MovieRatingDbContext.Celebrity'  is null.");
          }
            _context.Celebrity.Add(celebrity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCelebrity", new { id = celebrity.celebrityId }, celebrity);
        }

        // DELETE: api/Celebrities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCelebrity(int id)
        {
            if (_context.Celebrity == null)
            {
                return NotFound();
            }
            var celebrity = await _context.Celebrity.FindAsync(id);
            if (celebrity == null)
            {
                return NotFound();
            }

            _context.Celebrity.Remove(celebrity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CelebrityExists(int id)
        {
            return (_context.Celebrity?.Any(e => e.celebrityId == id)).GetValueOrDefault();
        }
    }
}
