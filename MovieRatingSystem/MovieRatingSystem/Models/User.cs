using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieRatingSystem.Models
{
    public class User
    {
        public int userId { get; set; }
        public string userName { get; set; } = string.Empty;
        public string uEmail { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public string uFirstName { get; set; } = string.Empty;
        public string uLastName { get; set; } = string.Empty;
        public string uMiddleName { get; set; } = string.Empty;
        public string uGender { get; set; } = string.Empty;
        public DateTime uDOB { get; set; }
        public string uCity { get; set; } = string.Empty;
        public string uCountry { get; set; } = string.Empty;
        public string imgUrl { get; set; } = string.Empty;

        [JsonIgnore]
        public IList<Review>? Reviews { get; set; }

    }
}
