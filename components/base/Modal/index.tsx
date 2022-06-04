import { useEventListener } from 'hooks';
import { memo, ReactNode } from 'react'
import ReactPortal from '../ReactPortal';

import * as Styles from './styles'

interface ModalProps {
  visible?: boolean
  children?: ReactNode;
  onClose?: () => void;
  id: string;
  disabled?: boolean
}

function BaseModal ({
  children,
  onClose,
  visible,
  id,
  disabled
}: ModalProps) {

  useEventListener('keydown', event => {
    const key = event.key
    if (key === 'Escape' && !disabled) return onClose?.()
  })

  if (!visible) return null

  return (
    <ReactPortal wrapperId={id}>
      <Styles.Overlay>
        <Styles.Container>{children}</Styles.Container>
      </Styles.Overlay>
    </ReactPortal>
  )
}

export const Modal = memo(BaseModal)