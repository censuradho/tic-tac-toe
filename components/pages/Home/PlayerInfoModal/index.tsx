import { ButtonIcon, Flex, Modal } from 'components/base'
import { ComponentProps, memo } from 'react'

import * as Styles from './styles'

type ModalProps = Omit<ComponentProps<typeof Modal>, 'children'>

interface PlayerInfoModalProps extends ModalProps {}

function BasePlayerInfoModal ({ ...props }: PlayerInfoModalProps) {
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
      </Styles.Container>
    </Modal>
  )
}

export const PlayerInfoModal = memo(BasePlayerInfoModal)