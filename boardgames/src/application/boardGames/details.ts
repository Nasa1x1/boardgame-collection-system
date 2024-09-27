import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/application/Core/result';  // Import Result class
import { BoardGame } from 'src/domain/boardgame.entity';
import { BoardGameDto } from './boardgame.dto';
import { BoardGameOwnerDto } from './boardGameOwner.dto';

export class GetBoardGameQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetBoardGameQuery)
export class GetBoardGameHandler implements IQueryHandler<GetBoardGameQuery> {
  constructor(
    @InjectRepository(BoardGame)
    private readonly boardGameRepository: Repository<BoardGame>,
  ) {}

  async execute(query: GetBoardGameQuery): Promise<Result<BoardGameDto>> {
    try {
      const boardGame = await this.boardGameRepository.findOne({
        where: { id: query.id },
        relations: ['boardGameOwners', 'boardGameOwners.user'],  // Include relations like in list.ts
      });

      if (!boardGame) {
        return Result.failure('Board game not found');
      }

      // Map BoardGameOwner to BoardGameOwnerDto
      const boardGameOwnerDtos = boardGame.boardGameOwners.map((owner) => {
        return new BoardGameOwnerDto(
          owner.user.id,
          owner.user.userName,
          owner.user.displayName,
          owner.boardGameId
        );
      });

      // Map BoardGame to BoardGameDto
      const boardGameDto = new BoardGameDto(
        boardGame.id,
        boardGame.title,
        boardGame.releaseDate,
        boardGame.description,
        boardGame.category,
        boardGame.maxPlayers,
        boardGame.minPlayers,
        boardGameOwnerDtos
      );

      return Result.success(boardGameDto);
    } catch (error) {
      return Result.failure('Failed to get board game');
    }
  }
}