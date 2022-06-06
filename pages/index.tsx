import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button, Flex, Icon } from 'components/base'
import { PlayerInfoModal, PlayerTypeSelect } from 'components/pages'

import { useGameContext } from 'context'


import * as Styles from 'styles/Home'
import * as DefaultStyles from 'styles/Default'
import { theme } from 'stitches.config'

import { updatePlayer, createPlayer, createGame } from 'lib/firestore'

import type { PlayerUpdateSchema } from 'types/game'
import { routePaths } from 'constants/routes'
import { resolvePath } from 'utils/helpers'
import { useState } from 'react'
import { PLAYER_TYPES } from 'constants/game'

const Home: NextPage = () => {
  const { 
    player, 
    adversary, 
    setStorageGame 
  } = useGameContext()

  const [playerType, setPlayerType] = useState(player?.type || 'x')

  const router = useRouter()

  const handleCreateVSCPU = async () => {
    try {
      const game = await createGame()

      const _player = await createPlayer(game.game_id, {
        name: 'Player 1',
        wins: 0,
        type: playerType
      })

      await createPlayer(game.game_id, {
        name: 'Player 2 (CPU)',
        wins: 0,
        isBot: true,
        type: playerType === 'o' ? 'x' : 'o'
      })

      setStorageGame({
        game_id: game.game_id,
        player_id: _player.id
      })
      
      router.push(resolvePath(routePaths.board, {
        id: game.game_id
      }))

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
            <Styles.PlayerTitle>{`Pick ${ player?.name || 'player 1'} is mark`}</Styles.PlayerTitle>
            <Styles.PlayerTypeContainer>
              <PlayerTypeSelect
                selected={playerType === PLAYER_TYPES.o}
                onSelect={() => setPlayerType(PLAYER_TYPES.o)}
                type={PLAYER_TYPES.o}
                disabled={adversary?.type === PLAYER_TYPES.o}
              />
              <PlayerTypeSelect 
                selected={playerType === PLAYER_TYPES.x}
                type={PLAYER_TYPES.x}
                onSelect={() => setPlayerType(PLAYER_TYPES.x)}
                disabled={adversary?.type === PLAYER_TYPES.x}
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
              disabled={!playerType}
              onClick={handleCreateVSCPU}
            >
              New game (vs cpu)
            </Button>
            <Button
              disabled={!playerType}
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
