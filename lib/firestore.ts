import { v4 as uuid } from 'uuid'

import { getFirestore, addDoc, setDoc, doc, updateDoc , getDoc  } from 'firebase/firestore'

import { app } from './firebase'

import { CreatePlayer, Game, Player, PlayerUpdateSchema } from 'types/game'
import { BOARD_POSITIONS } from 'constants/game'

const firestore = getFirestore(app)

export async function createGame (player: Player) {
  const uid = uuid()

  const game: Game = {
    game_id: uid,
    players: player
  }
  
  await setDoc(doc(firestore, 'games', uid), game);

  const response = await getDoc(doc(firestore, 'games', uid))
  return response.data() as Partial<Game>
}

export async function getGame (gameId: string) {
  const response = await getDoc(doc(firestore, 'games', gameId))
  return response.data() as Partial<Game>
}

export async function updatePlayer (gameId: string, playerId: string, payload: PlayerUpdateSchema) {
  const response = await getDoc(doc(firestore, 'games', gameId))

  const { players }  = response.data() as Partial<Game>

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