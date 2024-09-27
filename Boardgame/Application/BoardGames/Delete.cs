using Application.Core;
using MediatR;
using Persistence;

namespace Application.BoardGames
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id {get; set;}
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
                var boardGame = await _context.BoardGames.FindAsync(request.Id);
                if(boardGame ==null) return null;
                
                _context.Remove(boardGame);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to delte the boardGame");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}