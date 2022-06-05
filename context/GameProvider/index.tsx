import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'

import { BOARD_POSITIONS } from 'constants/game'

import { Game } from 'types/game'
import { PlayerInfoModal } from 'components/pages'

type GameData = {
  data: Partial<Game>
  setData: Dispatch<SetStateAction<Partial<Game>>>
}

interface GameProviderProps {
  children: ReactNode
}

export const GameContext = createContext<GameData>({} as GameData)

const baseGame: Partial<Game> = {
  players: []
}

export function GameProvider ({ children }: GameProviderProps) {
  const [data, setData] = useState<Partial<Game>>(baseGame)

  const [hasUser, setHasUser] = useState(data?.players && data?.players?.length > 0)

  return (
    <GameContext.Provider 
      value={{
        data,
        setData
      }}
    >
      <PlayerInfoModal
        id="home"
        visible={!hasUser}
        onClose={() => setHasUser(false)}
      />
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext =  () => useContext(GameContext)