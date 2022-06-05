import { Button, ButtonIcon, Flex, Modal, TextField } from 'components/base'
import { useGameContext } from 'context'
import { createGame } from 'lib/firestore'
import { ComponentProps, FormEvent, memo, useState } from 'react'

import * as Styles from './styles'

type ModalProps = Omit<ComponentProps<typeof Modal>, 'children' | 'disabled'>

interface PlayerInfoModalProps extends ModalProps {}

function BasePlayerInfoModal ({ 
  onClose,
  ...props
}: PlayerInfoModalProps) {
  const { setData } = useGameContext()

  const [nickName, setNickName] = useState('')

  const canCloseModal = nickName.length > 0

  const handleClose = canCloseModal ? onClose : undefined

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const response = await createGame(nickName)
    
    setData(prevState => ({
      ...prevState,
      ...response.data()
    }))
  }

  return (
    <Modal
      {...props}
      onClose={handleClose}
    >
      <Styles.Container onSubmit={handleSubmit}>
        <Flex
          fullWidth 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Styles.Title>What is your name?</Styles.Title>
          <ButtonIcon
            type="button"
            onClick={handleClose} 
            icon={{ name: 'close' }} 
          />
        </Flex>
        <TextField 
          autoFocus
          label="Nickname" 
          id="nickname"
          value={nickName}
          onChange={event => setNickName(event.target.value)}
        />
        <Flex fullWidth justifyContent="flex-end">
          <Button type="submit" disabled={!canCloseModal}>Confirmar</Button>
        </Flex>
      </Styles.Container>
    </Modal>
  )
}

export const PlayerInfoModal = memo(BasePlayerInfoModal)