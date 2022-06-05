import { Button, Flex, Icon } from 'components/base'
import { PlayerTypeSelect } from 'components/pages'
import { useGameContext } from 'context'

import type { NextPage } from 'next'


import * as Styles from 'styles/Home'
import * as DefaultStyles from 'styles/Default'
import { updatePlayer, createPlayer } from 'lib/firestore'
import { PlayerUpdateSchema } from 'types/game'

const Home: NextPage = () => {
  const { currentPlayer, data, adversary } = useGameContext()

  const handleUpdatePlayerType = async (type: string) => {
    if (!currentPlayer || !data.game_id) return;

    const player: PlayerUpdateSchema = {
      type
    }

    await updatePlayer(data.game_id, currentPlayer?.id, player)
  }

  const handleCreateVSCPU = async () => {
    try {
      if (!data.game_id) return;

      const type = currentPlayer?.type === 'o' ? 'x' : 'o'
  
      await createPlayer(data.game_id, {
        name: 'Player 2 CPU',
        type,
        isBot: true
      })
    } catch (err) {
      console.log(err)
    }
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
                disabled={adversary?.type === '0'}
              />
              <PlayerTypeSelect 
                selected={currentPlayer?.type === 'x'}
                type="x"
                onSelect={() => handleUpdatePlayerType('x')}
                disabled={adversary?.type === 'x'}
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
              onClick={handleCreateVSCPU}
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
