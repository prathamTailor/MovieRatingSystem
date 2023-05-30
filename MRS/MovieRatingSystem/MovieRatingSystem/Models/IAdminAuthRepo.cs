namespace MovieRatingSystem.Models
{
    public interface IAdminAuthRepo
    {
        Task<int> Register(Admin admin, string password);
        Task<string> Login(string adminName, string password);
        Task<bool> AdminExists(string adminName,string aEmail);
    }
}
