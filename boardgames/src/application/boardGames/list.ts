import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/application/Core/result';  // Import Result class
import { BoardGame } from 'src/domain/boardgame.entity';
import { BoardGameDto } from './boardgame.dto';

// Zapytanie służące do pobrania listy gier planszowych.
export class GetBoardGamesQuery {}

@QueryHandler(GetBoardGamesQuery)
export class GetBoardGamesHandler implements IQueryHandler<GetBoardGamesQuery> {
  constructor(
    @InjectRepository(BoardGame)
    private readonly boardGameRepository: Repository<BoardGame>,
  ) {}
// Obsługa zapytania, która pobiera gry planszowe i zwraca je jako DTO.
  async execute(query: GetBoardGamesQuery): Promise<Result<BoardGameDto[]>> {
        const boardGames = await this.boardGameRepository.find(); 
        
        // Mapowanie wyników na DTO, które zostaną zwrócone.
        const boardGameDtos = boardGames.map((boardGame) => {
          return new BoardGameDto(
            boardGame.id,
            boardGame.title,
            boardGame.releaseDate,
            boardGame.description,
            boardGame.category,
            boardGame.maxPlayers,
            boardGame.minPlayers,
            []  
          );
        });

      return Result.success(boardGameDtos);  
  }
}