using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.BoardGames
{
    public class UpdateOwning
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public string UserId { get; set; } 
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
    public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
{
    // Pobranie gry z właścicielami
    var boardGame = await _context.BoardGames
        .Include(x => x.BoardGameOwners).ThenInclude(y => y.User)
        .SingleOrDefaultAsync(x => x.Id == request.Id);
    
    if (boardGame == null)
    {
        return Result<Unit>.Failure("Board game not found");
    }
    
    // Pobranie użytkownika
    
    var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.UserId);

    if (user == null)
    {
        return Result<Unit>.Failure("User not found");
    }
    
    // Sprawdzenie, czy użytkownik jest właścicielem
    var owner = boardGame.BoardGameOwners.FirstOrDefault(x => x.User.Id == user.Id);
    Console.Write(owner);
    
    // Usuwanie lub dodawanie właściciela
    if (owner != null)
    {
        boardGame.BoardGameOwners.Remove(owner);
    }

    if (owner == null)
    {
        owner = new BoardGameOwner
        {
            User = user,
            BoardGame = boardGame,
        };
        boardGame.BoardGameOwners.Add(owner);
    }
    
    // Zapis do bazy danych
    var result = await _context.SaveChangesAsync() > 0;
    
    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating owning");
}
        }
    }
}