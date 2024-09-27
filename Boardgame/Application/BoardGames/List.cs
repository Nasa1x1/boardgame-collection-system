using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BoardGames
{
    public class List
    {
        // Definicja zapytania o listę BoardGameDto
        public class Query : IRequest<Result<List<BoardGameDto>>>{}
        
        // Handler obsługujący zapytanie
        public class Handler : IRequestHandler<Query, Result<List<BoardGameDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
                
            }
            // Obsługa zapytania i pobranie listy gier z mapowaniem na DTO
            public async Task<Result<List<BoardGameDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var boardgames = await _context.BoardGames
                    .ProjectTo<BoardGameDto>(_mapper.ConfigurationProvider) // Mapowanie na DTO
                    .ToListAsync(cancellationToken); // Pobranie listy gier
                    
                return Result<List<BoardGameDto>>.Success(boardgames); // Zwrócenie wyniku
            }
        }
    }
}