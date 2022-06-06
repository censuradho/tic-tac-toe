import { v4 as uuid } from 'uuid'

import { getFirestore, addDoc, setDoc, doc, updateDoc , getDoc  } from 'firebase/firestore'

import { app } from './firebase'

import { CreatePlayer, Game, GameUpdateSchema, Player, PlayerUpdateSchema } from 'types/game'
import { BOARD_POSITIONS } from 'constants/game'
import { RiContactsBookLine } from '@meronex/icons/ri'

export const firestore = getFirestore(app)

export async function createGame (player: Player) {
  const uid = uuid()

  const game: Game = {
    game_id: uid,
    players: player
  }
  
  await setDoc(doc(firestore, 'games', uid), game);

  const response = await getDoc(doc(firestore, 'games', uid))
  return response.data() as Game
}

export async function getGame (gameId: string) {
  const response = await getDoc(doc(firestore, 'games', gameId))
  return response.data() as Partial<Game>
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

  const { players = null }  = response.data() || {}  as Partial<Game>

  if (!players) throw new Error('Do not have players to update')

  const { [playerId]: player } = players

  if (!player) throw new Error('Player not found')

  const updatePlayer = {
    ...player,
    ...payload
  }

  const updatePayload = {
    ...(players || {}),
    [playerId]: updatePlayer
  }

  await updateDoc(doc(firestore, 'games', gameId), { 
    players: updatePayload 
  });
}

export async function createPlayer (gameId: string, payload: CreatePlayer) {
  const uid = uuid()

  const player: Player = {
    [uid]: {
      id: uid,
      ...payload,
      plays: BOARD_POSITIONS
    }
  }

  const response = await getDoc(doc(firestore, 'games', gameId))
  const data = response.data() as Partial<Game>

  const canCreatePlayer = Object.keys(data.players || {}).length < 2

  if (!canCreatePlayer) throw new Error('Can not create a new player')

  await updateDoc(doc(firestore, 'games', gameId), { 
    players: {
      ...data.players,
      ...player
    }
  });
  
  // const game: Game = {
  //   game_id: gameId,
  //   players: player
  // }

}