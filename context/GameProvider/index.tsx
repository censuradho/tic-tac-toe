import { 
  ReactNode, 
  createContext, 
  useContext, 
  useState, 
  SetStateAction, 
  Dispatch, 
  useCallback, 
  useMemo
} from 'react'
import { v4 as uuid } from 'uuid'

import { BOARD_POSITIONS } from 'constants/game'

import { Game, Player, PlayerSchema, PlayerUpdateSchema } from 'types/game'
import { PlayerInfoModal } from 'components/pages'
import { createGame, updatePlayer } from 'lib/firestore'

type GameData = {
  currentPlayer: PlayerSchema | null;
  setCurrentPlayer: (player: Partial<PlayerUpdateSchema>) => void;
  addPlayer: (name: string) => void;
  adversary?: PlayerSchema |null;
  data: Partial<Game>
  setData: Dispatch<SetStateAction<Partial<Game>>>
}

interface GameProviderProps {
  children: ReactNode
}

export const GameContext = createContext<GameData>({} as GameData)

const baseGame: Partial<Game> = {
  players: {}
}

export function GameProvider ({ children }: GameProviderProps) {
  const [data, setData] = useState<Partial<Game>>(baseGame)
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSchema | null>(null)

  const adversary = useMemo(() => {
    const _adversary = Object
    .entries(data?.players || {})
    .find(([key, value]) => value.id !== currentPlayer?.id)

    if (!_adversary) return null

    const [result] = Object.entries(_adversary).map(([key, value]) => value) as PlayerSchema[]

    return result

  }, [currentPlayer, data?.players])

  const hasUser = !!currentPlayer

  const handleAddPlayer = useCallback(async (name: string) => {
    const id = uuid()

    const player: PlayerSchema = {
      id,
      name,
      plays: BOARD_POSITIONS,
    }

    if (!currentPlayer) {
      const game = await createGame({
        [id]: player
      })
      setCurrentPlayer(player)
      setData(game)
    }

  }, [currentPlayer])

  const handleUpdateCurrentPlayer = useCallback((player: Partial<PlayerUpdateSchema>) => {
    setCurrentPlayer(prevState => prevState && ({
      ...prevState,
      ...player
    }))
  }, [])

  return (
    <GameContext.Provider 
      value={{
        currentPlayer,
        addPlayer: handleAddPlayer,
        setCurrentPlayer: handleUpdateCurrentPlayer,
        data,
        adversary,
        setData
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