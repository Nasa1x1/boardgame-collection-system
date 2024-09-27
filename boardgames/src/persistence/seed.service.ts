import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { BoardGame } from '../domain/boardgame.entity';
import { BoardGameOwner } from 'src/domain/boardgameOwner.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BoardGame)
    private readonly boardGameRepository: Repository<BoardGame>,
    @InjectRepository(BoardGameOwner)
    private readonly boardGameOwnerRepository: Repository<BoardGameOwner>,
  ) {}

  async seed() {
    
    //await this.boardGameOwnerRepository.clear();
    //await this.boardGameRepository.clear();
    //await this.userRepository.clear();
   

    // Seed Users
    const users = [
      { displayName: 'Jan', userName: 'jan', email: 'jan@test.com', password: "Password", roles: ['admin']},
      { displayName: 'Aleksander', userName: 'aleksander', email: 'aleksander@test.com', password: "Password"},
      { displayName: 'Teresa', userName: 'teresa', email: 'teresa@test.com', password: "Password" },
    ];

    for (const user of users) {
      const exists = await this.userRepository.findOneBy({ userName: user.userName });
      if (!exists) {
        user.password = await bcrypt.hash(user.password, 10);
        await this.userRepository.save(user);
      }
    }

    const boardGames = [
      {
        title: 'Root',
        releaseDate: new Date(),
        description: 'Root boardgame',
        category: 'war',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Oath',
        releaseDate: new Date(),
        description: 'Oath boardgame',
        category: 'war',
        maxPlayers: 6,
        minPlayers: 1,
      },
      {
        title: 'Scythe',
        releaseDate: new Date(),
        description: 'Scythe boardgame',
        category: 'war',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Ankh',
        releaseDate: new Date(),
        description: 'Ankh boardgame',
        category: 'war',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Terraforming Mars',
        releaseDate: new Date(),
        description: 'Terraforming Mars boardgame',
        category: 'euro',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Mysthea',
        releaseDate: new Date(),
        description: 'Mysthea boardgame',
        category: 'war',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Everdell',
        releaseDate: new Date(),
        description: 'Everdell boardgame',
        category: 'euro',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Libertaria',
        releaseDate: new Date(),
        description: 'Libertaria boardgame',
        category: 'euro',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Clank',
        releaseDate: new Date(),
        description: 'Clank boardgame',
        category: 'deckbuilding',
        maxPlayers: 4,
        minPlayers: 1,
      },
      {
        title: 'Clank in space',
        releaseDate: new Date(),
        description: 'Clank boardgame',
        category: 'deckbuilding',
        maxPlayers: 4,
        minPlayers: 1,
      },
    ];

    for (const game of boardGames) {
      const exists = await this.boardGameRepository.findOneBy({ title: game.title });
      if (!exists) {
        await this.boardGameRepository.save(game);
      }
    }
  


  }
}