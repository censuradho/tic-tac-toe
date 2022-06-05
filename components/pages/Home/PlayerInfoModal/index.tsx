import { Button, ButtonIcon, Flex, Modal, TextField } from 'components/base'
import { useGameContext } from 'context'
import { useBooleanToggle } from 'hooks'
import { ComponentProps, FormEvent, memo, useState } from 'react'

import * as Styles from './styles'

type ModalProps = Omit<ComponentProps<typeof Modal>, 'children' | 'disabled' | 'onClose'>

interface PlayerInfoModalProps extends ModalProps {}

function BasePlayerInfoModal ({ 
  ...props
}: PlayerInfoModalProps) {
  const { addPlayer } = useGameContext()

  const [nickName, setNickName] = useState('')

  const [isLoading, toggleIsLoading] = useBooleanToggle(false)

  const canCloseModal = nickName.length > 0


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    toggleIsLoading()
    try {
      addPlayer(nickName)
    } finally {
      toggleIsLoading()
    }
  }

  return (
    <Modal
      {...props}
    >
      <Styles.Container onSubmit={handleSubmit}>
        <Flex
          fullWidth 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Styles.Title>What is your name?</Styles.Title>
        </Flex>
        <TextField 
          autoFocus
          label="Nickname" 
          id="nickname"
          value={nickName}
          onChange={event => setNickName(event.target.value)}
        />
        <Flex fullWidth justifyContent="flex-end">
          <Button 
            type="submit" 
            disabled={isLoading || !canCloseModal}
          >
            Confirmar
          </Button>
        </Flex>
      </Styles.Container>
    </Modal>
  )
}

export const PlayerInfoModal = memo(BasePlayerInfoModal)