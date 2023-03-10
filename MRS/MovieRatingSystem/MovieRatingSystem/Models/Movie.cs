using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class Movie
    {
        public int movieId { get; set; }
        public string movieName { get; set; } = string.Empty;
        public string movieType { get; set; } = string.Empty;
        public int movieReleaseYear { get; set; }
        public float movieRating { get; set; }
        public string movieDescription { get; set; } = string.Empty;
        public string trailerUrl { get; set; } = string.Empty;
        public string imgUrl { get; set; } = string.Empty;
        public int reviewCount { get; set; } = 0;

        public int adminId { get; set; }
        [JsonIgnore]
        public Admin? Admin { get; set; }

        [JsonIgnore]
        public IList<MovieCelebrity>? MovieCelebrities { get; set; }
        [JsonIgnore]
        public IList<MovieRole>? MovieRoles { get; set; }

    }
}
