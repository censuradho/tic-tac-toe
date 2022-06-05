import { v4 as uuid } from 'uuid'
import { Player } from "types/game"
import { IconNames } from 'components/base'

export const BOARD_POSITIONS = ['', '', '', '', '', '', '', '', '']

export const playerTypeIcon: Record<string, IconNames> = {
  o: 'square',
  x: 'x'
}