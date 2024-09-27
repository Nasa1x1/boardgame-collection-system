import { DataSource } from 'typeorm';
import { User } from 'src/domain/user.entity';
import { BoardGame } from 'src/domain/boardgame.entity';
import { BoardGameOwner } from 'src/domain/boardgameOwner.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, BoardGame, BoardGameOwner],
  migrations: ['dist/persistence/migrations/*.js'],
  synchronize: false,
});

