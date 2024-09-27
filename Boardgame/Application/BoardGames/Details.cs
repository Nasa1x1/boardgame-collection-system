
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BoardGames
{
    public class Details
    {
        public class Query : IRequest<Result<BoardGameDto>>
        {
           public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<BoardGameDto>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            _context = context;
            _mapper = mapper;
            }

            public async Task<Result<BoardGameDto>> Handle(Query request, CancellationToken cancellationToken)
            {
               var boardGame = await _context.BoardGames
                    .ProjectTo<BoardGameDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                

               return Result<BoardGameDto>.Success(boardGame);
            }
        }
    }
}