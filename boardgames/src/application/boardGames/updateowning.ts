import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardGame } from 'src/domain/boardgame.entity';
import { BoardGameOwner } from 'src/domain/boardgameOwner.entity';
import { User } from 'src/domain/user.entity';
import { Result } from 'src/application/Core/result';

export class UpdateOwningCommand {
  constructor(public readonly boardGameId: string, public readonly userId: string) {}
}

@CommandHandler(UpdateOwningCommand)
export class UpdateOwningHandler implements ICommandHandler<UpdateOwningCommand> {
  constructor(
    @InjectRepository(BoardGame)
    private readonly boardGameRepository: Repository<BoardGame>,
    @InjectRepository(BoardGameOwner)
    private readonly boardGameOwnerRepository: Repository<BoardGameOwner>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateOwningCommand): Promise<Result<void>> {
     const boardGame = await this.boardGameRepository.findOne({
        where: { id: command.boardGameId },
        relations: ['boardGameOwners', 'boardGameOwners.user'],
      });
    
      if (!boardGame) {
        return Result.failure('Board game not found');
      }

      const user = await this.userRepository.findOne({ where: { id: command.userId } });
      
      if (!user) {
        return Result.failure('User not found');
      }

      const owner = boardGame.boardGameOwners.find(owner => owner.user.id === user.id);
  
      let result;
      if (owner) {
        // Usunięcie właściciela gry
        boardGame.boardGameOwners = boardGame.boardGameOwners.filter(o => o.user.id !== user.id);
        result = await this.boardGameOwnerRepository.remove(owner); // TypeORM zwraca obiekt po usunięciu
      } else {
        // Dodanie nowego właściciela
        const newOwner = this.boardGameOwnerRepository.create({
          user,
          boardGame,
        });
        boardGame.boardGameOwners.push(newOwner);
        result = await this.boardGameOwnerRepository.save(newOwner); // TypeORM zwraca zapisany obiekt
      }

      // Sprawdzenie, czy operacja się powiodła
      return result ? Result.success(undefined) : Result.failure('Failed to update ownership');
  }
}