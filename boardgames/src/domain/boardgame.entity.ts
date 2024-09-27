import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardGameOwner } from './boardgameOwner.entity';


@Entity()
export class BoardGame {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string;

  @Column()
  maxPlayers: number;

  @Column()
  minPlayers: number;

  @OneToMany(() => BoardGameOwner, (boardGameOwner) => boardGameOwner.boardGame, { cascade: true, onDelete: 'CASCADE' })
  boardGameOwners: BoardGameOwner[];
}