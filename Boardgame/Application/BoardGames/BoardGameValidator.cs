

using Domain;
using FluentValidation;

namespace Application.BoardGames
{
    public class BoardGameValidator: AbstractValidator<BoardGame>
    {
        public BoardGameValidator()
        {
            RuleFor(x=> x.Title).NotEmpty();
            RuleFor(x=> x.ReleaseDate).NotEmpty();
            RuleFor(x=> x.Description).NotEmpty();
            RuleFor(x=> x.Category).NotEmpty();
            RuleFor(x=> x.MaxPlayers).NotEmpty();
            RuleFor(x=> x.MinPlayers).NotEmpty();

        }
    }
}