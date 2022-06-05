import { 
  ReactNode, 
  createContext, 
  useContext, 
  useState, 
  SetStateAction, 
  Dispatch, 
  useCallback, 
  useMemo,
  useEffect
} from 'react'
import { v4 as uuid } from 'uuid'

import { BOARD_POSITIONS } from 'constants/game'

import { CurrentPlayer, Game, PlayerSchema, PlayerUpdateSchema, StoragePlayer } from 'types/game'
import { PlayerInfoModal } from 'components/pages'
import { createGame } from 'lib/firestore'
import { useFirestore, useLocalStorage } from 'hooks'

type GameData = {
  currentPlayer?: PlayerSchema | null;
  addPlayer: (name: string) => void;
  adversary?: PlayerSchema |null;
  data: Partial<Game>;
  currentTurn: PlayerSchema | null
}

interface GameProviderProps {
  children: ReactNode
}

export const GameContext = createContext<GameData>({} as GameData)

const baseGame: Partial<Game> = {
  players: {}
}

export function GameProvider ({ children }: GameProviderProps) {
  const [storagePlayer, setStoragePlayer] = useLocalStorage<StoragePlayer | null>('@tic-tac-toe:storageUser', null)
  const { data } = useFirestore<Game>(`/games/${storagePlayer?.game_id}`)

  const currentPlayer = useMemo(() => {
    if (!storagePlayer) return null

    const _currentPlayer = Object
      .entries(data?.players || {})
      .find(([key, value]) => value.id === storagePlayer.id)

    if (!_currentPlayer) return null

    const [key, result] = _currentPlayer

    return result
  }, [data?.players, storagePlayer])

  const adversary = useMemo(() => {
    if (!storagePlayer) return null
    
    const _adversary = Object
      .entries(data?.players || {})
      .find(([key, value]) => value.id !== storagePlayer?.id)

    if (!_adversary) return null

    const [key, result] = _adversary

    return result

  }, [storagePlayer, data?.players])

  const hasUser = !!storagePlayer && !!currentPlayer

  const handleAddPlayer = useCallback(async (name: string) => {
    const id = uuid()

    const player: PlayerSchema = {
      id,
      name,
      plays: BOARD_POSITIONS,
    }

    if (!storagePlayer) {
      const game = await createGame({
        [id]: player
      })

      setStoragePlayer({
        game_id: game.game_id,
        id: player.id,
        name: player.name
      })
    }

  }, [setStoragePlayer, storagePlayer])

  const currentTurn = useMemo(() => {
    const adversaryMoves = (adversary?.plays || []).filter(value => value).length
    const currentPlayerMoves = (currentPlayer?.plays || []).filter(value => value).length

    const players = [
      adversary,
      currentPlayer
    ]

    if ((currentPlayerMoves + adversaryMoves) === 0) return (players.find(value => value?.type === 'x') || null)

    if (currentPlayerMoves > adversaryMoves) return adversary

    return currentPlayer

  }, [adversary, currentPlayer])
  
  return (
    <GameContext.Provider 
      value={{
        currentPlayer,
        addPlayer: handleAddPlayer,
        data,
        adversary,
        currentTurn
      }}
    >
      <PlayerInfoModal
        id="home"
        visible={!hasUser}
      />
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext =  () => useContext(GameContext)