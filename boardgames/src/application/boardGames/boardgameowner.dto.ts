export class BoardGameOwnerDto {
    userId: string;
    userName: string;
    displayName: string;
    boardGameId: string;  
  
    constructor(userId: string, userName: string, displayName: string, boardGameId: string) {
      this.userId = userId;
      this.userName = userName;
      this.displayName = displayName;
      this.boardGameId = boardGameId;
    }
  }