
export interface PlayerSchema {
  id: string;
  name: string;
  plays: string[];
  type?: string;
  isBot?: boolean;
}

export type Player = Record<string, PlayerSchema>

export type CreatePlayer = Omit<PlayerSchema, 'id' | 'plays'>

export type PlayerUpdateSchema = Partial<Omit<PlayerSchema, 
'id'
>>


export type CurrentPlayer = PlayerSchema & {
  game_id: string
}

export interface StoragePlayer {
  game_id: string;
  id: string;
  name: string
}

export interface Game {
  game_id: string;
  currentPlayerId?: string;
  players: Player;
}

export type GameUpdateSchema = Partial<Game>