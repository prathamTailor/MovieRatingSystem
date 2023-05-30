using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRatingSystem.Models;

namespace MovieRatingSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly MovieRatingDbContext _context;

        public ReviewsController(MovieRatingDbContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReview()
        {
          if (_context.Review == null)
          {
              return NotFound();
          }
            return await _context.Review.ToListAsync();
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
          if (_context.Review == null)
          {
              return NotFound();
          }
            var review = await _context.Review.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        [HttpGet("movie/{id}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetAllReview(int id)
        {

            if (_context.Review == null)
            {
                return NotFound();
            }
            var reviews = await _context.Review.ToListAsync();

            if (reviews == null)
            {
                return NotFound();
            }

            var res = reviews.FindAll(item => item.movieId == id);

            return res;
        }

        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.reviewId)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
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

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<string>> PostReview(Review review)
        {
          if (_context.Review == null)
          {
              return Problem("Entity set 'MovieRatingDbContext.Review'  is null.");
          }
            _context.Review.Add(review);
            var movie = await _context.Movies.FindAsync(review.movieId);
            movie.reviewCount += 1;
            movie.movieRating = (movie.movieRating + review.rating) / (movie.reviewCount);
            _context.Entry(movie).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok("Review Added Successfully");
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            if (_context.Review == null)
            {
                return NotFound();
            }
            var review = await _context.Review.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Review.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return (_context.Review?.Any(e => e.reviewId == id)).GetValueOrDefault();
        }
    }
}
