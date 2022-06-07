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

import { BOARD_POSITIONS, WIN_COMBOS } from 'constants/game'

import type { 
  CurrentPlayer, 
  GameSchema, 
  PlayerSchema, 
  PlayerUpdateSchema, 
  StorageGameSchema 
} from 'types/game'

import { PlayerInfoModal } from 'components/pages'
import { createGame, createPlayer, updateGame, updatePlayer } from 'lib/firestore'
import { useFirestore, useLocalStorage } from 'hooks'

type GameData = {
  player?: PlayerSchema | null;
  winner: PlayerSchema | undefined;
  wonSequence: number[];
  adversary?: PlayerSchema |null;
  data: Partial<GameSchema>;
  storageGame: StorageGameSchema | null;
  currentTurn: PlayerSchema | null;
  move: (playerId: string, index: number) => Promise<void>
  resetGame: () => Promise<void>;
  setStorageGame: (value: StorageGameSchema) => void
}

interface GameProviderProps {
  children: ReactNode
}

export const GameContext = createContext<GameData>({} as GameData)

export function GameProvider ({ children }: GameProviderProps) {
  const [storageGame, setStorageGame] = useLocalStorage<StorageGameSchema | null>('@tic-tac-toe:storageUser', null)
  
  const { data } = useFirestore<Partial<GameSchema>>(`/games/${storageGame?.game_id}`)

  const player = useMemo(() => {
    if (!storageGame) return null

    const _player = Object
      .entries(data?.players || {})
      .find(([key, value]) => value.id === storageGame.player_id)

    if (!_player) return null

    const [key, result] = _player

    return result
  }, [data?.players, storageGame])

  const adversary = useMemo(() => {
    if (!storageGame) return null
    
    const _adversary = Object
      .entries(data?.players || {})
      .find(([key, value]) => value.id !== storageGame?.player_id)

    if (!_adversary) return null

    const [key, result] = _adversary

    return result

  }, [data?.players, storageGame])
  
  const currentTurn = useMemo(() => {
    const adversaryMoves = data?.board?.filter(value => value === adversary?.type).length || 0
    const playerMoves = data?.board?.filter(value => value === player?.type).length || 0

    const players = [
      adversary,
      player
    ]

    if ((playerMoves + adversaryMoves) === 0) return (players.find(value => value?.type === 'x') || null)

    if (playerMoves > adversaryMoves) return adversary

    return player

  }, [adversary, player, data])

  const winner = useMemo(() => {
    const players = Object.entries(data?.players || {}).map(([key, value]) => value)

    const won = players.find(player => {
      const comboMatch = WIN_COMBOS.find(combo => {
      const match = combo.every(cell => data?.board?.[cell] === player.type)
        return match
      })

      return comboMatch
    })

    return won
  }, [data?.board, data?.players])

  const wonSequence = useMemo(() => {
    return WIN_COMBOS.find(combo => {
      const match = combo.every(cell => data?.board?.[cell] === winner?.type)
      return match
    }) || []
  }, [data?.board, winner?.type])
  
  const move = useCallback(async (playerId: string, index: number) => {
    if (!data.game_id || !!winner || !adversary?.id || currentTurn?.id !== player?.id) return;

    const currentPlayer = data?.players?.[playerId]
    const alreadyMoved = data?.board?.[index]

    if (alreadyMoved) return;

    const board = data?.board?.map((value, cell) => index === cell ? (currentPlayer?.type as string) : value)

    await updateGame(data.game_id, {
      board
    })

  }, [adversary?.id, currentTurn?.id, data?.board, data.game_id, data?.players, player?.id, winner])

  const resetGame = useCallback(async () => {
    if (!data.game_id || !data?.players) return;
    
    const players = Object.entries(data?.players).map(([key, value]) => ({
      [key]: {
        ...value,
        ...(value.id === winner?.id && ({
          wins: (value?.wins || 0) + 1
        })),
      }
    })).reduce((prev, next) => ({
      ...prev,
      ...next
    }))

    await updateGame(data.game_id, {
      board: BOARD_POSITIONS,
      players
    })
    
  }, [data.game_id, data?.players, winner?.id])


  return (
    <GameContext.Provider 
      value={{
        winner,
        wonSequence,
        player,
        adversary,
        storageGame,
        data,
        currentTurn,
        resetGame,
        move,
        setStorageGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext =  () => useContext(GameContext)