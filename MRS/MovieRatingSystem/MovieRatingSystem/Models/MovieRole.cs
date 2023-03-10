using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class MovieRole
    {

        public int movieRoleId { get; set; }

        public int? movieId { get; set; }
        [JsonIgnore]
        public Movie? Movie { get; set; }

        public int? roleId { get; set; }
        [JsonIgnore]
        public Role? Role { get; set; }

    }
}
