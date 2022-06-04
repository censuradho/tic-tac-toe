import { v4 as uuid } from 'uuid'

import { getFirestore, addDoc, setDoc, doc, getDocs, getDoc  } from 'firebase/firestore'

import { app } from './firebase'

import { CreateGame, Game } from 'types/game'

const firestore = getFirestore(app)

export async function createGame (payload: CreateGame) {
  const uid = uuid()

  await setDoc(doc(firestore, 'games', uid), payload);

  return await (await getDoc(doc(firestore, 'games', uid))).data() as Game
}