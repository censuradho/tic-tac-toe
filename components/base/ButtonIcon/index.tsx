import { ButtonHTMLAttributes, ComponentProps, memo } from 'react'
import { Icon } from 'components/base'

import * as Styles from './styles'

type IconProps = ComponentProps<typeof Icon>

type RootButtonAttrs = Pick<ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
  | 'disabled'
>

interface ButtonIconProps extends RootButtonAttrs {
  icon: IconProps
}

function BaseButtonIcon ({
  icon,
  ...props
}: ButtonIconProps) {
  return (
    <Styles.Button {...props}>
      <Icon {...icon} />
    </Styles.Button>
  )
}

export const ButtonIcon = memo(BaseButtonIcon)