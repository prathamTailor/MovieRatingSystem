using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class CelebrityRole
    {
        public int celebrityRoleId { get; set; }

        public int? celebrityId { get; set; }
        [JsonIgnore]
        public Celebrity? Celebrity { get; set; }

        public int? roleId { get; set; }
        [JsonIgnore]
        public Role? Role { get; set; }

    }
}
