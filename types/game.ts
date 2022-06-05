
export interface PlayerSchema {
  id: string;
  name: string;
  plays: string[];
  type?: string;
}

export type Player = Record<string, PlayerSchema>

export type CreatePlayer = PlayerSchema

export type PlayerUpdateSchema = Partial<Omit<PlayerSchema, 
'id'
>>

export interface Game {
  game_id: string;
  players: Player;
}