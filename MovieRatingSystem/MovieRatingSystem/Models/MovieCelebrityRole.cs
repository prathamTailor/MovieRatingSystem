using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class MovieCelebrityRole
    {
        public int movieCelebrityRoleId { get; set; }

        public int? movieId { get; set; }
        [JsonIgnore]
        public Movie? Movie { get; set; }

        public int? celebrityId { get; set; }
        [JsonIgnore]
        public Celebrity? Celebrity { get; set; }

        public int? roleId { get; set; }
        [JsonIgnore]
        public Role? Role { get; set; }
    }
}
