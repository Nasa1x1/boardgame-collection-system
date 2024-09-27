import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardGameOwner } from './boardgameOwner.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  displayName: string;

  @Column({unique: true})
  userName: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column("simple-array", { default: "user" }) 
  roles: string[];  


  @OneToMany(() => BoardGameOwner, (boardGameOwner) => boardGameOwner.user)
  boardGames: BoardGameOwner[];
}