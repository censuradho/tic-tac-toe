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

import { CurrentPlayer, Game, PlayerSchema, PlayerUpdateSchema, StoragePlayer } from 'types/game'
import { PlayerInfoModal } from 'components/pages'
import { createGame, updateGame, updatePlayer } from 'lib/firestore'
import { useFirestore, useLocalStorage } from 'hooks'

type GameData = {
  currentPlayer?: PlayerSchema | null;
  winner?: {
    player?: PlayerSchema | null;
    play: number[]
  };
  addPlayer: (name: string) => Promise<void>;
  adversary?: PlayerSchema |null;
  data: Partial<Game>;
  currentTurn: PlayerSchema | null;
  move: (playerId: string, index: number) => Promise<void>
  resetGame: () => Promise<void>;
}

interface GameProviderProps {
  children: ReactNode
}

export const GameContext = createContext<GameData>({} as GameData)

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

  const winner = useMemo(() => {
    const players = [
      currentPlayer,
      adversary
    ]

    const win = WIN_COMBOS.map(play => {
      const [first, secondy, third] = play

      const player = players.find(player => 
        player?.plays[first]
        && player?.plays[secondy]
        && player?.plays[third]
      )

      if (!player) return undefined

      return {
        player,
        play
      }
    })

    return win.find(value => value)
  }, [adversary, currentPlayer])

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

  
  const move = useCallback(async (playerId: string, index: number) => {
    if (!data.game_id ||  !playerId) return;

    const player = data.players[playerId]
    const plays = player.plays.map((value, indexPlay) => indexPlay === index ? (player.type as string) : value)
    
    await updatePlayer(data.game_id, playerId, {
      plays
    })

  }, [data.game_id, data.players])

  const resetGame = useCallback(async () => {
    if (!data.game_id) return;
    
    const players = Object.entries(data.players).map(([key, value]) => ({
      [key]: {
        ...value,
        ...(value.id === winner?.player?.id && ({
          wins: (value?.wins || 0) + 1
        })),
        plays: BOARD_POSITIONS
      }
    })).reduce((prev, next) => ({
      ...prev,
      ...next
    }))

    await updateGame(data.game_id, {
      players
    })
    
  }, [data.game_id, data.players, winner])


  return (
    <GameContext.Provider 
      value={{
        winner,
        currentPlayer,
        addPlayer: handleAddPlayer,
        data,
        adversary,
        currentTurn,
        resetGame,
        move
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