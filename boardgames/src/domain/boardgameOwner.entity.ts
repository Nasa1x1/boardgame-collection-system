import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { BoardGame } from './boardgame.entity';

@Entity()
export class BoardGameOwner {
  @PrimaryColumn()
  boardGameId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.boardGames)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => BoardGame, (boardGame) => boardGame.boardGameOwners)
  @JoinColumn({ name: 'boardGameId' }) 
  boardGame: BoardGame;
}