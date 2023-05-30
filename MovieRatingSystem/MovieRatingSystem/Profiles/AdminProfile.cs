using AutoMapper;
using MovieRatingSystem.DTOs;
using MovieRatingSystem.Models;

namespace MovieRatingSystem.Profiles
{
    public class AdminProfile : Profile
    {
        public AdminProfile() {
            CreateMap<Admin, AdminDTO>();
            CreateMap<Admin, AdminDTO>().ReverseMap();
        }
    }
}
