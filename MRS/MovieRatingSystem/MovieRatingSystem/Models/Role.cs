using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class Role
    {
        public int roleId { get; set; }
        public string roleName { get; set; } = string.Empty;
        public string roleDescription { get; set; } = string.Empty;

        public int adminId { get; set; }
        [JsonIgnore]
        public Admin? Admin { get; set; }

        [JsonIgnore]
        public IList<CelebrityRole>? CelebrityRoles { get; set; }
        [JsonIgnore]
        public IList<MovieRole>? MovieRoles { get; set; }

    }
}
