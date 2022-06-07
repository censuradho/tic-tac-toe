import { PLAYER_TYPES, WIN_COMBOS } from "constants/game";

export function createWrapperAndAppendToBody(wrapperId: string | number) {
  const id = String(wrapperId)

  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", id);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export const resolvePath = (path: string, obj: Record<string, any>) => {
  let tempPath = path;

  Object.keys(obj).map(key => (tempPath = tempPath.replace(`:${key}`, obj[key])));

  return tempPath;
};

export function getWinnerSequence (board: string[], playerType: string) {
  return WIN_COMBOS.find(combo => {
    const match = combo.every(cell => board[cell] === playerType)
    return match
  }) || []
}

export const bestAction = (board: string[], me: string) => {
  const minMaxAlgorithm = (board: string[], player: string, me: string, maxDepth = 9) => {
    const meWinner = getWinnerSequence(board, me).length > 0
    const playerWinner = getWinnerSequence(board, player).length > 0

    const isFull = board.filter(value => !value).length === 0

    const moves = board
      .map((value, index) => !value ? index : null)
      .filter(value => value) as number[]

    if (meWinner) return 1
    if (playerWinner && !isFull) return -1
    if (isFull) return 0

    if (player === me) { //MAX
      let best = -Infinity

      moves.forEach(move => {
        const newBoard = board.map((value, cell) => move === cell ? (player) : value)
        const value = minMaxAlgorithm(newBoard, player === PLAYER_TYPES.x ? PLAYER_TYPES.o : PLAYER_TYPES.x, me)
        
        if (value > best) {
          best = value
          return move
        }
      })

    return best

    } else { // MIN
      let best = Infinity

      moves.forEach(move => {
        const newBoard = board.map((value, cell) => move === cell ? (player) : value)
        const value = minMaxAlgorithm(newBoard, player === PLAYER_TYPES.x ? PLAYER_TYPES.o : PLAYER_TYPES.x, me)
        
        if (value < best) {
          best = value
          return move
        }
      })

      return best
    }
  }

  
  const moves = board
    .map((value, index) => !value ? index : null)
    .filter(value => value) as number[]

  let best = -Infinity

  const bestAction = moves.find(move => {
    const newBoard = board.map((value, cell) => move === cell ? me : value)

    const value = minMaxAlgorithm(newBoard, me, me)

    if (value > best) {
      best = value
      return move
    }
  })

  return bestAction
}
