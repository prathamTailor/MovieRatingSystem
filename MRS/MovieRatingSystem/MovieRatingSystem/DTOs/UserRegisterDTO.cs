namespace MovieRatingSystem.DTOs
{
    public class UserRegisterDTO
    {
        public string userName { get; set; } = string.Empty;
        public string uEmail { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string uFirstName { get; set; } = string.Empty;
        public string uLastName { get; set; } = string.Empty;
        public string uMiddleName { get; set; } = string.Empty;
        public string uGender { get; set; } = string.Empty;
        public DateTime uDOB { get; set; }
        public string uCity { get; set; } = string.Empty;
        public string uCountry { get; set; } = string.Empty;
        public string imgUrl { get; set; } = string.Empty;


    }
}
