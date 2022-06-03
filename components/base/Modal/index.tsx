import { useEventListener } from 'hooks';
import { memo, ReactNode } from 'react'

import * as Styles from './styles'

interface ModalProps {
  children?: ReactNode;
  onClose?: () => void;
}

function BaseModal ({
  children,
  onClose
}: ModalProps) {

  useEventListener('keydown', event => {
    const key = event.key
    if (key === 'Escape') return onClose?.()
  })

  return (
    <Styles.Overlay>
      <Styles.Container>{children}</Styles.Container>
    </Styles.Overlay>
  )
}

export const Modal = memo(BaseModal)