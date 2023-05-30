namespace MovieRatingSystem.DTOs
{
    public class CelebrityRoleOfMovieDTO
    {
        public int celebrityId { get; set; }
        public string celebrityName { get; set; } = string.Empty;
        public string gender { get; set; } = string.Empty;
        public DateTime dob { get; set; }
        public string birthPlace { get; set; } = string.Empty;
        public string imgUrl { get; set; } = string.Empty;
        public int roleId { get; set; }
        public string roleName { get; set; } = string.Empty;
        public string roleDescription { get; set; } = string.Empty;
    }
}
