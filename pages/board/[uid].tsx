import { Flex, Icon } from "components/base"
import { NextPage } from "next"

import * as DefaultStyles from 'styles/Default'

const Board: NextPage = () => {
  return (
    <DefaultStyles.Main>
      <DefaultStyles.Container>
        <Flex justifyContent="space-between">
          <Flex gap={0.5}>
            <Icon name="x" color="primary" />
            <Icon name="square" color="secondary" />
          </Flex>
        </Flex>
      </DefaultStyles.Container>
    </DefaultStyles.Main>
  )
}

export default Board
