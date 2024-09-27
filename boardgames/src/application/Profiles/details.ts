import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { User } from 'src/domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from '../Core/result';

export class DetailsQuery {
    constructor(public readonly userName: string) {}
}

@QueryHandler(DetailsQuery)
export class DetailsQueryHandler implements IQueryHandler<DetailsQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: DetailsQuery) {
    const user = await this.userRepository.findOne({
      where: { userName: query.userName },
      relations: ['boardGames', 'boardGames.boardGame'],
    });
  
    if (user == null) return null;
    
    const profile ={
      username: user.userName,
      displayName: user.displayName,
      boardGames: user.boardGames.map(boardGameOwner => ({
      id: boardGameOwner.boardGame.id,
      title: boardGameOwner.boardGame.title,
      releaseDate: boardGameOwner.boardGame.releaseDate,
      description: boardGameOwner.boardGame.description,
      category: boardGameOwner.boardGame.category,
      maxPlayers: boardGameOwner.boardGame.maxPlayers,
      minPlayers: boardGameOwner.boardGame.minPlayers,
      })),
    }
    
    return Result.success(profile);
  }

}
