import { v4 as uuid } from 'uuid'

import { getFirestore, setDoc, doc, updateDoc , getDoc  } from 'firebase/firestore'

import { app } from './firebase'

import type { 
  CreateGame, 
  CreatePlayer, 
  GameSchema, 
  GameUpdateSchema, 
  Player, 
  PlayerSchema, 
  PlayerUpdateSchema 
} from 'types/game'

import { BOARD_POSITIONS } from 'constants/game'

export const firestore = getFirestore(app)

export async function createGame () {
  const uid = uuid()

  const game: CreateGame = {
    game_id: uid,
    board: BOARD_POSITIONS
  }
  
  await setDoc(doc(firestore, 'games', uid), game);

  const response = await getDoc(doc(firestore, 'games', uid))
  return response.data() as GameSchema
}

export async function getGame (gameId: string) {
  const response = await getDoc(doc(firestore, 'games', gameId))
  return response.data() as GameSchema
}

export async function updateGame (gameId: string, payload: GameUpdateSchema) {
  const response = await getDoc(doc(firestore, 'games', gameId))
  const data = response.data()

  if (!data) throw new Error('game is not initialized')

  await updateDoc(doc(firestore, 'games', gameId), {
    ...data,
    ...payload
  })
} 

export async function updatePlayer (gameId: string, playerId: string, payload: PlayerUpdateSchema) {
  const response = await getDoc(doc(firestore, 'games', gameId))

  const { players = null }  = response.data() || {}  as Partial<GameSchema>

  if (!players) throw new Error('Do not have players to update')

  const { [playerId]: player } = players

  if (!player) throw new Error('Player not found')

  const updatePlayer = {
    ...player,
    ...payload
  } as PlayerSchema

  const updatePayload = {
    ...(players || {}),
    [playerId]: updatePlayer
  }

  await updateDoc(doc(firestore, 'games', gameId), { 
    players: updatePayload 
  });

  return updatePlayer
}

export async function createPlayer (gameId: string, payload: CreatePlayer) {
  const uid = uuid()

  const player: PlayerSchema = {
    id: uid,
    ...payload,
  }

  const payloadPlayer: Player = {
    [uid]: {
      id: uid,
      ...payload,
    }
  }

  const response = await getDoc(doc(firestore, 'games', gameId))
  const data = response.data() as Partial<GameSchema>

  const canCreatePlayer = Object.keys(data.players || {}).length < 2

  if (!canCreatePlayer) throw new Error('Can not create a new player')

  await updateDoc(doc(firestore, 'games', gameId), { 
    players: {
      ...data.players,
      ...payloadPlayer
    }
  });
  
  return player
}