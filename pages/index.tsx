import { Button, Flex, Icon, Modal } from 'components/base'
import { PlayerTypeSelect } from 'components/pages'
import { useGameContext } from 'context'

import type { NextPage } from 'next'
import { useState } from 'react'

import * as Styles from 'styles/Home'
import * as DefaultStyles from 'styles/Default'
import { updatePlayer } from 'lib/firestore'
import { PlayerUpdateSchema } from 'types/game'

const Home: NextPage = () => {
  const { currentPlayer, data, setCurrentPlayer } = useGameContext()

  const handleUpdatePlayerType = async (type: string) => {
    if (!currentPlayer || !data.game_id) return;

    const player: PlayerUpdateSchema = {
      type
    }
    
    await updatePlayer(data.game_id, currentPlayer?.id, player)
    setCurrentPlayer(player)
  }

  return (
    <DefaultStyles.Main>
      <DefaultStyles.Container>
        <Flex flexDirection="column" gap={2}>
          <Flex gap={1} justifyContent="center">
            <Icon name="x" color="primary" />
            <Icon name="square" color="secondary" />
          </Flex>
          <Styles.PlayerSection>
            <Styles.PlayerTitle>{`Pick ${ currentPlayer?.name || 'player 1'} is mark`}</Styles.PlayerTitle>
            <Styles.PlayerTypeContainer>
              <PlayerTypeSelect
                selected={currentPlayer?.type === 'o'}
                onSelect={() => handleUpdatePlayerType('o')}
                type="o" 
              />
              <PlayerTypeSelect 
                selected={currentPlayer?.type === 'x'}
                type="x"
                onSelect={() => handleUpdatePlayerType('x')}
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
      </DefaultStyles.Container>
    </DefaultStyles.Main>
  )
}

export default Home
