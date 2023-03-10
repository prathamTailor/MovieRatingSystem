using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class Admin
    {
        public int adminId { get; set; }
        public string adminName { get; set; } = string.Empty;
        public string aEmail { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public string aFirstName { get; set; } = string.Empty;
        public string aLastName { get; set; } = string.Empty;
        public string aMiddleName { get; set; } = string.Empty;
        public string aGender { get; set; } = string.Empty;
        public DateTime aDOB { get; set; }
        public string aCity { get; set; } = string.Empty;
        public string aCountry { get; set; } = string.Empty;
        public string imgUrl { get; set; } = string.Empty;
            
        [JsonIgnore]
        public IList<Celebrity>? Celebrities { get; set; }
        [JsonIgnore]
        public IList<Movie>? Movies { get; set; }
        [JsonIgnore]
        public IList<Role>? Roles { get; set; }

    }
}
