import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardGame } from 'src/domain/boardgame.entity';
import { Result } from 'src/application/Core/result';


export class DeleteBoardGameCommand {
    constructor(public readonly id: string) {}
  }

  @CommandHandler(DeleteBoardGameCommand)
  export class DeleteBoardGameHandler implements ICommandHandler<DeleteBoardGameCommand> {
    constructor(
      @InjectRepository(BoardGame)
      private readonly boardGameRepository: Repository<BoardGame>,
    ) {}
  
    async execute(command: DeleteBoardGameCommand): Promise<Result<BoardGame>> {
      const boardGame = await this.boardGameRepository.findOne({
        where: { id: command.id },
        relations: ['boardGameOwners'],
    });
   

        if (!boardGame) return Result.failure<BoardGame>("Board game not found");

        await this.boardGameRepository.manager.transaction(async (entityManager) => {
          await entityManager.remove(boardGame.boardGameOwners);
          await entityManager.remove(boardGame);
      });
    
        return Result.success(boardGame);
       
      
    }
  }