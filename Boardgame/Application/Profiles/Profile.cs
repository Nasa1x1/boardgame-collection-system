
using Application.BoardGames;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username {get;set;}
        public string DisplayName {get;set;}
        public ICollection<BoardGameDto> BoardGames { get; set; }

    }
}