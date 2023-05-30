using AutoMapper;
using MovieRatingSystem.DTOs;
using MovieRatingSystem.Models;

namespace MovieRatingSystem.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile() {
            CreateMap<User, UserDTO>();
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
