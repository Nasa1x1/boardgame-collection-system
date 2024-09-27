import { BoardGame } from "./boardgame";
import { User } from "./user";
export interface Profile {
    userName: string;
    displayName: string;
    boardGames?: BoardGame[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
    }
}
