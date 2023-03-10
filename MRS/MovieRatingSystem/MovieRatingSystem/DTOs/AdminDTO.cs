namespace MovieRatingSystem.DTOs
{
    public class AdminDTO
    {
        public int adminId { get; set; }
        public string adminName { get; set; } = string.Empty;
        public string aEmail { get; set; } = string.Empty;
        public string aFirstName { get; set; } = string.Empty;
        public string aLastName { get; set; } = string.Empty;
        public string aMiddleName { get; set; } = string.Empty;
        public string aGender { get; set; } = string.Empty;
        public DateTime aDOB { get; set; }
        public string aCity { get; set; } = string.Empty;
        public string aCountry { get; set; } = string.Empty;
        public string imgUrl { get; set; } = string.Empty;


    }
}
