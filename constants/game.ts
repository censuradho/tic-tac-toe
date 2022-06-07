import { IconNames } from 'components/base'

export const BOARD_POSITIONS: string[] = Array.from(Array(9).fill(''))

export const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
]

export const PLAYER_TYPES = {
  o: 'o',
  x: 'x',
}

export const playerTypeIcon: Record<string, IconNames> = {
  o: 'square',
  x: 'x'
}
