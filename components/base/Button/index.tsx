import { ButtonHTMLAttributes, memo } from 'react'
import { VariantProps } from '@stitches/react'

import * as Styles from './styles'

type RootButtonAttr = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 
  'onClick'
  | 'disabled'
>

type StylesVariant = VariantProps<typeof Styles.Button>

interface ButtonProps extends 
  RootButtonAttr, 
  StylesVariant {
  children: string
}

function BaseButton ({ 
  children,
  ...props
}: ButtonProps) {
  return (
    <Styles.Button {...props}>{children}</Styles.Button>
  )
}

export const Button = memo(BaseButton)