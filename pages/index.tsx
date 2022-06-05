import { Button, Flex, Icon, Modal } from 'components/base'
import { PlayerInfoModal, PlayerTypeSelect } from 'components/pages'
import { useGameContext } from 'context'
import { useBooleanToggle } from 'hooks'

import type { NextPage } from 'next'
import { useState } from 'react'

import * as Styles from 'styles/Home'

const Home: NextPage = () => {
  const { data } = useGameContext()
  const [playerType, setPlayerType] = useState('x')

  const [hasUser, setHasUser] = useState(!!data?.player1)

  return (
    <Styles.Main>
      <Styles.Container>
        <Flex flexDirection="column" gap={2}>
          <Flex gap={1} justifyContent="center">
            <Icon name="x" color="primary" />
            <Icon name="square" color="secondary" />
          </Flex>
          <Styles.PlayerSection>
            <Styles.PlayerTitle>Pick player 1 is mark</Styles.PlayerTitle>
            <Styles.PlayerTypeContainer>
              <PlayerTypeSelect
                selected={playerType === '0'}
                onSelect={() => setPlayerType('0')}
                type="o" 
              />
              <PlayerTypeSelect 
                selected={playerType === 'x'}
                type="x"
                onSelect={() => setPlayerType('x')}
              />
            </Styles.PlayerTypeContainer>
            <Styles.PlayerDescription>Remember, x goes first</Styles.PlayerDescription>
          </Styles.PlayerSection>
          <Flex
            flexDirection="column"
            gap={1}
          >
            <Button
              variant="secondary"
              fullWidth
            >
              New game (vs cpu)
            </Button>
            <Button
              fullWidth
            >
              New game (vs player)
            </Button>
          </Flex>
        </Flex>
      </Styles.Container>
    </Styles.Main>
  )
}

export default Home
