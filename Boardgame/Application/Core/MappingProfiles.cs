
using Application.BoardGames;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<BoardGame, BoardGame>()
             .ForMember(x => x.BoardGameOwners, opt => opt.Ignore());

            CreateMap<BoardGame, BoardGameDto>();

            CreateMap<BoardGameOwner,BoardGameOwnerDto>()
                .ForMember(x => x.DisplayName, y => y.MapFrom(z => z.User.DisplayName))
                .ForMember(x => x.Username, y => y.MapFrom(z => z.User.UserName));
                
            
            CreateMap<User, Profiles.Profile>()
                 .ForMember(x => x.BoardGames, y => y.MapFrom(z => z.BoardGames.Select(a => a.BoardGame)));
                    
                
                
        }   
    }
}