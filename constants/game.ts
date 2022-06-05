import { v4 as uuid } from 'uuid'
import { Player } from "types/game"

export const BOARD_POSITIONS = ['', '', '', '', '', '', '', '', '']

export const BASE_PLAYER: Player = {
  id: uuid(),
  name: '',
  plays: BOARD_POSITIONS,
  type: 'x'
}