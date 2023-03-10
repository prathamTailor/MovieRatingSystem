using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class MovieCelebrity
    {
        public int movieCelebrityId { get; set; }

        public int? movieId { get; set; }
        [JsonIgnore]
        public Movie? Movie { get; set; }

        public int? celebrityId { get; set; }
        [JsonIgnore]
        public Celebrity? Celebrity { get; set; } 
    }
}
