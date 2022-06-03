import { Grid, Icon } from 'components/base'
import { PlayerTypeSelect } from 'components/pages'

import type { NextPage } from 'next'
import { useState } from 'react'

import * as Styles from 'styles/Home'

const Home: NextPage = () => {
  const [playerType, setPlayerType] = useState('')

  return (
    <Styles.Main>
      <Styles.Container>
        <Styles.PlayerSection>
          <Styles.PlayerTitle>Pick player 1 mark</Styles.PlayerTitle>
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
      </Styles.Container>
    </Styles.Main>
  )
}

export default Home
