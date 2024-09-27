import { BoardGameOwnerDto } from './boardGameOwner.dto';  

export class BoardGameDto {
  id: string;  
  title: string;
  releaseDate: Date;
  description: string;
  category: string;
  maxPlayers: number;
  minPlayers: number;
  boardGameOwners: BoardGameOwnerDto[];

  constructor(
    id: string,
    title: string,
    releaseDate: Date,
    description: string,
    category: string,
    maxPlayers: number,
    minPlayers: number,
    boardGameOwners: BoardGameOwnerDto[]
  ) {
    this.id = id;
    this.title = title;
    this.releaseDate = releaseDate;
    this.description = description;
    this.category = category;
    this.maxPlayers = maxPlayers;
    this.minPlayers = minPlayers;
    this.boardGameOwners = boardGameOwners;
  }
}