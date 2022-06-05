export interface Player {
  name: string;
  plays: string[]
}

export type CreatePlayer = Player

export interface Game {
  game_id: string;
  players: Player[];
}