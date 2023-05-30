using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class Review
    {
        public int reviewId { get; set; }
        public int rating { get; set; }
        public string reviewDescription { get; set; } = string.Empty;

        public int userId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        public int movieId { get; set; }
        [JsonIgnore]
        public Movie? Movie { get; set; }
    }
}
