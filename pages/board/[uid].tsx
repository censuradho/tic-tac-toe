import { NextPage } from "next"
import { VariantProps } from '@stitches/react'

import { Flex, Grid, Icon } from "components/base"

import { BOARD_POSITIONS, playerTypeIcon, PLAYER_TYPES } from "constants/game"

import { useGameContext } from "context"

import * as DefaultStyles from 'styles/Default'
import * as Styles from 'styles/Board'
import { useCallback, useEffect } from "react"
import { createPlayer, getGame } from "lib/firestore"
import { useRouter } from "next/router"
import { routePaths } from "constants/routes"

type Variants = VariantProps<typeof Styles.ButtonBoard>['variant']

const Board: NextPage = () => {
  const router = useRouter()
  const { id: gameId } = router.query
  const { 
    player, 
    adversary, 
    move, 
    currentTurn, 
    resetGame,
    setStorageGame,
    wonSequence,
    winner,
    data
  } = useGameContext()


  const mapTypeToVariant = (type?: string) =>  {
    const variants: Record<string, Variants> = {
      'o': 'primary',
      'x': 'secondary',
    }

    return type && variants?.[type as keyof typeof variants] || undefined
  }


  const handleGetInitialState = useCallback(async () => {
    if (player?.id || !gameId) return;

    const game = await getGame(gameId as string)

    console.log(game)
    if (!game) router.push(routePaths.home)

    const _player = await createPlayer(game.game_id, {
      name: 'Player 2',
      wins: 0,
      type: adversary?.type === PLAYER_TYPES.x ? PLAYER_TYPES.o : PLAYER_TYPES.x
    })

    setStorageGame({
      game_id: game.game_id,
      player_id: _player.id,
    })
  }, [adversary?.type, gameId, player?.id, router, setStorageGame])

  const currentTurnIcon = playerTypeIcon?.[currentTurn?.type as keyof typeof playerTypeIcon]

  // const renderBoard = BOARD_POSITIONS.map((value, index) => {
  //   const currentPlayerPlay = currentPlayer?.plays[index]
  //   const adversaryPlay = adversary?.plays[index]

  //   const type = playerTypeIcon[(currentPlayerPlay || adversaryPlay) || ''] || ''

  //   const playerAlreadyHavePlayInThisBoard = (!!adversary?.plays[index] || !!currentPlayer?.plays[index])

  //   const canChoose = currentTurn && !playerAlreadyHavePlayInThisBoard && !winner?.player

  //   const variant = 
  //     winner?.play.includes(index)
  //       ? mapTypeToVariant(winner?.player?.type)
  //       : undefined

  //   return (
  //     <Styles.ButtonBoard 
  //       disabled={!canChoose} 
  //       key={index}
  //       variant={variant}
  //       onClick={() => move(currentTurn?.id as string, index)}
  //     >
  //       {type && <Icon name={type as any || 'x'} />}
  //     </Styles.ButtonBoard>
  //   )
  // })

  const renderBoard = data?.board?.map((value, index) => {

    const variant = wonSequence.includes(index) 
      ? mapTypeToVariant(winner?.type) 
      : undefined

    return (
      <Styles.ButtonBoard
        key={index}
        onClick={() => move(currentTurn?.id as string, index)}
        disabled={!currentTurn}
        variant={variant}
      >
        {value && <Icon name={playerTypeIcon[value as keyof typeof playerTypeIcon] || 'restart'} />}
      </Styles.ButtonBoard>
    )
  })

  useEffect(() => {
    handleGetInitialState()
  }, [handleGetInitialState])


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
              {/* {currentTurnIcon && <Icon name={currentTurnIcon} />} */}
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
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap={1}>
            <Styles.Info variant={mapTypeToVariant(player?.type)}>
              <span>{`${player?.type} you`}</span>
              {player?.wins}
            </Styles.Info>
            <Styles.Info variant={mapTypeToVariant(adversary?.type)}>
              <span>{`${player?.type} ${adversary?.name}`}</span>
              {adversary?.wins}
            </Styles.Info>
          </Grid>
        </Flex>
      </DefaultStyles.Container>
    </DefaultStyles.Main>
  )
}

export default Board
