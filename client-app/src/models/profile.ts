import { BoardGame } from "./boardgame";
import { User } from "./user";
export interface Profile {
    username: string;
    displayName: string;
    boardGames?: BoardGame[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
    }
}
