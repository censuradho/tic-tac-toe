
export interface PlayerSchema {
  id: string;
  name: string;
  type?: string;
  isBot?: boolean;
  wins: number;
}

export type Player = Record<string, PlayerSchema>

export type CreatePlayer = Omit<PlayerSchema, 'id'>

export type PlayerUpdateSchema = Partial<Omit<PlayerSchema, 
'id'
>>

export type CurrentPlayer = PlayerSchema & {
  game_id: string
}

export interface GameSchema {
  game_id: string;
  board: string[];
  players: Player;
}

export type CreateGame = Pick<GameSchema, 
  'game_id'
  | 'board'
>

export type GameUpdateSchema = Partial<GameSchema>

export interface StorageGameSchema {
  game_id: string;
  player_id?: string
} 