import { NextPage } from "next"
import { VariantProps } from '@stitches/react'

import { Flex, Grid, Icon } from "components/base"

import { BOARD_POSITIONS, playerTypeIcon, PLAYER_TYPES } from "constants/game"

import { useGameContext } from "context"

import * as DefaultStyles from 'styles/Default'
import * as Styles from 'styles/Board'
import { useCallback, useEffect, useMemo } from "react"
import { createPlayer, getGame, updatePlayer } from "lib/firestore"
import { useRouter } from "next/router"
import { routePaths } from "constants/routes"
import { PlayerSchema, StorageGameSchema } from "types/game"

type Variants = VariantProps<typeof Styles.ButtonBoard>['variant']

const Board: NextPage = () => {
  const router = useRouter()
  const { id: gameId } = router.query
  const { 
    player,
    storageGame,
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
    if (player?.id || !gameId || storageGame) return;

    const game = await getGame(gameId as string)

    if (!game) router.push(routePaths.home)

    const storagePlayer = {} as StorageGameSchema

    const hasMoreThanOnePlayer = Object.keys(game.players).length > 1

    if (hasMoreThanOnePlayer) {
      const [_, botPlayer] = Object.entries(game.players).find(([key, value]) => value.isBot) as [string, PlayerSchema]
      
      const _player = await updatePlayer(game.game_id, botPlayer.id, {
        isBot: false,
        name: 'Player 2',
      })

      const newStoragePlayer: StorageGameSchema = {
        game_id: game.game_id,
        player_id: _player.id
      }

      Object.assign(storagePlayer, newStoragePlayer)
    } else {
      const _player = await createPlayer(game.game_id, {
        name: 'Player 2',
        wins: 0,
        type: adversary?.type === PLAYER_TYPES.x ? PLAYER_TYPES.o : PLAYER_TYPES.x
      })

      const newStoragePlayer =  {
        game_id: game.game_id,
        player_id: _player.id,
      }

      Object.assign(storagePlayer, newStoragePlayer)
    }

    setStorageGame(storagePlayer)
  }, [adversary?.type, gameId, player?.id, router, setStorageGame, storageGame])

  const currentTurnIcon = playerTypeIcon?.[currentTurn?.type as keyof typeof playerTypeIcon]

  const renderBoard = useMemo(() => data?.board?.map((value, index) => {

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
  }), [currentTurn, data?.board, move, winner?.type, wonSequence])

  const info = winner ? (
    <span>{winner?.name && `${winner?.name} winner`}</span>
  ) : (
    <>
      {currentTurnIcon && <Icon name={currentTurnIcon} />}
      <span>{currentTurn?.name && `${currentTurn?.name} turn`}</span>
    </>
  )
  useEffect(() => {
    handleGetInitialState()
  }, [handleGetInitialState])

  console.log(winner)

  return (
    <DefaultStyles.Main>
      <DefaultStyles.Container>
        <Flex flexDirection="column" gap={3}>
          <Flex justifyContent="space-between" alignItems="center" gap={1}>
            <Flex gap={0.5}>
              <Icon name="x" color="primary" />
              <Icon name="square" color="secondary" />
            </Flex>
            <Styles.Turn variants={winner?.type ? (winner.type === PLAYER_TYPES.x ? 'secondary' : 'primary') : undefined}>
             {info}
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
              <span>{`${adversary?.type} ${adversary?.name}`}</span>
              {adversary?.wins}
            </Styles.Info>
          </Grid>
        </Flex>
      </DefaultStyles.Container>
    </DefaultStyles.Main>
  )
}

export default Board
