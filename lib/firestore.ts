import { v4 as uuid } from 'uuid'

import { getFirestore, addDoc, setDoc, doc, getDocs, getDoc  } from 'firebase/firestore'

import { app } from './firebase'

import { CreatePlayer, Game } from 'types/game'
import { BOARD_POSITIONS } from 'constants/game'

const firestore = getFirestore(app)

export async function createGame (playerName: string) {
  const uid = uuid()

  const player: CreatePlayer = {
    name: playerName,
    plays: BOARD_POSITIONS
  }

  const game: Game = {
    game_id: uid,
    players: [player]
  }
  
  await setDoc(doc(firestore, 'games', uid), game);

  return await getDoc(doc(firestore, 'games', uid))
}

export async function getGame (gameId: string) {
  return await getDoc(doc(firestore, 'games', gameId))
}