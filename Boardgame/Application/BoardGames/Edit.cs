
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.BoardGames
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BoardGame BoardGame { get; set; }
        }
 
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BoardGame).SetValidator(new BoardGameValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper=mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var boardGame = await _context.BoardGames.FindAsync(request.BoardGame.Id);

                if(boardGame==null) return null;

                _mapper.Map(request.BoardGame,boardGame);
                 
                var result =await _context.SaveChangesAsync() >0;
                if(!result) return Result<Unit>.Failure("Failed to update the boardgame");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}