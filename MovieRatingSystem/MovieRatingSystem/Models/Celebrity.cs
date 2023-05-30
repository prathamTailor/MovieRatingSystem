using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class Celebrity
    {
        public int celebrityId { get; set; }
        public string celebrityName { get; set; } = string.Empty;
        public string gender { get; set; } = string.Empty;
        public DateTime dob { get; set; }
        public string birthPlace { get; set; } = string.Empty;
        public string imgUrl { get; set; } = string.Empty;

        public int adminId { get; set; }
        [JsonIgnore]
        public Admin? Admin { get; set; }

        [JsonIgnore]
        public IList<MovieCelebrity>? MovieCelebrities { get; set; }

        [JsonIgnore]
        public IList<CelebrityRole>? CelebrityRoles { get; set; }

    }
}
