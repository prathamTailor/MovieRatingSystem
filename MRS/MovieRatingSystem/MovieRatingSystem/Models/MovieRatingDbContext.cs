using Microsoft.EntityFrameworkCore;
using MovieRatingSystem.Models;

namespace MovieRatingSystem.Models
{
    public class MovieRatingDbContext : DbContext
    {
        public MovieRatingDbContext(DbContextOptions<MovieRatingDbContext> options)
            : base(options) { 
        
        }

        public DbSet<Movie> Movies { get; set; } = null!;
        public DbSet<Admin> Admin { get; set; } = null!;
        public DbSet<Celebrity> Celebrity { get; set; } = null!;
        public DbSet<Review> Review { get; set; } = null!;
        public DbSet<Role> Role { get; set; } = null!;
        public DbSet<User> User { get; set; } = null!;
        public DbSet<MovieCelebrityRole> MovieCelebrityRoles { get; set; } = null!;
        public DbSet<MovieCelebrity> MovieCelebrities { get; set; } = null!;
        public DbSet<MovieRole> MovieRoles { get; set; } = null!;
        public DbSet<CelebrityRole> CelebrityRoles { get; set; } = null!;
    }
}
