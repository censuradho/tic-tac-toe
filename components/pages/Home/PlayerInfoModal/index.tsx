import { ButtonIcon, Flex, Modal, TextField } from 'components/base'
import { ComponentProps, memo, useEffect, useRef } from 'react'

import * as Styles from './styles'

type ModalProps = Omit<ComponentProps<typeof Modal>, 'children' | 'disabled'>

interface PlayerInfoModalProps extends ModalProps {}

function BasePlayerInfoModal ({ 
  ...props
}: PlayerInfoModalProps) {

  return (
    <Modal
      {...props}
    >
      <Styles.Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Styles.Title>What is your name?</Styles.Title>
          <ButtonIcon
            onClick={props?.onClose} 
            icon={{ name: 'close' }} 
          />
        </Flex>
        <TextField 
          autoFocus
          label="Nickname" 
          id="nickname" 
        />
      </Styles.Container>
    </Modal>
  )
}

export const PlayerInfoModal = memo(BasePlayerInfoModal)