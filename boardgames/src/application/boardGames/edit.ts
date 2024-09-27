import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardGame } from 'src/domain/boardgame.entity';
import { Result } from 'src/application/Core/result';


export class EditBoardGameCommand {
  constructor(public readonly boardGame: BoardGame, public readonly id: string) {}
}

@CommandHandler(EditBoardGameCommand)
export class EditBoardGameHandler implements ICommandHandler<EditBoardGameCommand> {
  constructor(
    @InjectRepository(BoardGame)
    private readonly boardGameRepository: Repository<BoardGame>,
  ) {}

  async execute(command: EditBoardGameCommand): Promise<Result<BoardGame>> {
    const boardGame = await this.boardGameRepository.findOneBy({ id: command.id });

    if (!boardGame) return Result.failure<BoardGame>("Board game not found");
    
    const errors = this.validateBoardGame(command.boardGame);
    if (errors.length > 0) {
      return Result.failure<BoardGame>(`Validation failed: ${errors.join(', ')}`);
    }
    
    this.boardGameRepository.merge(boardGame, command.boardGame);
   
    const result = await this.boardGameRepository.save(boardGame);
    if(!result) return Result.failure("failed");

    return Result.success(boardGame);

    
  }


  private validateBoardGame(boardGame: BoardGame): string[] {
    const errors: string[] = [];

    if (!boardGame.title || boardGame.title.trim() === '') {
      errors.push('Title is required');
    }

    if (!boardGame.releaseDate || isNaN(Date.parse(boardGame.releaseDate.toString()))) {
      errors.push('Invalid release date');
    }

    if (!boardGame.category || boardGame.category.trim() === '') {
      errors.push('Category is required');
    }

    if (!boardGame.maxPlayers || boardGame.maxPlayers <= 0) {
      errors.push('MaxPlayers must be greater than 0');
    }

    if (!boardGame.minPlayers || boardGame.minPlayers <= 0) {
      errors.push('MinPlayers must be greater than 0');
    }

    if (boardGame.maxPlayers < boardGame.minPlayers) {
      errors.push('MaxPlayers must be greater than or equal to MinPlayers');
    }

    return errors;
  }
}