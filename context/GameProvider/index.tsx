import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'

import { CreateGame, Game } from 'types/game'

type GameData = {
  data: Partial<Game>
  setData: Dispatch<SetStateAction<Partial<CreateGame>>>
}

interface GameProviderProps {
  children: ReactNode
}

export const GameContext = createContext<GameData>({} as GameData)

export function GameProvider ({ children }: GameProviderProps) {
  const [data, setData] = useState<Partial<Game>>({})

  console.log(data)
  return (
    <GameContext.Provider 
      value={{
        data,
        setData
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext =  () => useContext(GameContext)