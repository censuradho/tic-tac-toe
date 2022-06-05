import { Flex, Icon } from "components/base"
import { playerTypeIcon } from "constants/game"
import { useGameContext } from "context"
import { NextPage } from "next"

import * as DefaultStyles from 'styles/Default'
import * as Styles from 'styles/Board'

const Board: NextPage = () => {
  const { currentPlayer } = useGameContext()

  console.log(currentPlayer)

  return (
    <DefaultStyles.Main>
      <DefaultStyles.Container>
        <Flex justifyContent="space-between">
          <Flex gap={0.5}>
            <Icon name="x" color="primary" />
            <Icon name="square" color="secondary" />
          </Flex>
          <Styles.Turn>
            <Icon name={(playerTypeIcon[currentPlayer?.type as any] || 'square')} />
            <span>Turn</span>
          </Styles.Turn>
        </Flex>
      </DefaultStyles.Container>
    </DefaultStyles.Main>
  )
}

export default Board
