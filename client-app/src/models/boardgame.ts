import { Profile } from "./profile"

export interface BoardGame {
    id: string
    title: string
    releaseDate: Date | null
    description: string
    category: string
    maxPlayers: number
    minPlayers: number
    boardGameOwners?: Profile[];
    isOwning: boolean;
  }
  