import { BoardGameDto } from "../boardGames/boardgame.dto";
 
export class Profile {
  userName: string;
  displayName: string;
  boardGames: BoardGameDto[];

  constructor(userName: string, displayName: string, boardGames: BoardGameDto[]) {
    this.userName = userName;
    this.displayName = displayName;
    this.boardGames = boardGames;
  }
}