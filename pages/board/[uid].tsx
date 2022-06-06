import { Flex, Grid, Icon } from "components/base"
import { BOARD_POSITIONS, playerTypeIcon } from "constants/game"
import { useGameContext } from "context"
import { NextPage } from "next"

import * as DefaultStyles from 'styles/Default'
import * as Styles from 'styles/Board'
import { PlayerSchema } from "types/game"

const Board: NextPage = () => {
  const { 
    currentPlayer, 
    adversary, 
    move, 
    currentTurn, 
    resetGame 
  } = useGameContext()

  const renderBoard = BOARD_POSITIONS.map((value, index) => {
    const currentPlayerPlay = currentPlayer?.plays[index]
    const adversaryPlay = adversary?.plays[index]

    const type = playerTypeIcon[(currentPlayerPlay || adversaryPlay) || ''] || ''

    const somePlayerAlreadyHavePlayInThisBoard = (!!adversary?.plays[index] || !!currentPlayer?.plays[index])

    const canChoose = currentTurn && !somePlayerAlreadyHavePlayInThisBoard

    return (
      <Styles.ButtonBoard key={index} onClick={() => canChoose && move(currentTurn?.id, index)}>
        {type && <Icon name={type as any || 'x'} />}
      </Styles.ButtonBoard>
    )
  })

  return (
    <DefaultStyles.Main>
      <DefaultStyles.Container>
        <Flex flexDirection="column" gap={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex gap={0.5}>
              <Icon name="x" color="primary" />
              <Icon name="square" color="secondary" />
            </Flex>
            <Styles.Turn>
              <Icon name={(playerTypeIcon[currentTurn?.type as any] || 'square')} />
              <span>{`${currentTurn?.name} turn`}</span>
            </Styles.Turn>
            <Styles.RestartButton onClick={resetGame}>
              <Icon name="restart" color="background" />
            </Styles.RestartButton>
          </Flex>
          <Grid 
            gridTemplateColumns="repeat(3, 1fr)"  
            gridTemplateRows="repeat(3, 1fr)"
            gap={1}
          >
            {renderBoard}
          </Grid>
        </Flex>
      </DefaultStyles.Container>
    </DefaultStyles.Main>
  )
}

export default Board
