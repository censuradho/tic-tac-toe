import { forwardRef, InputHTMLAttributes, memo } from 'react'

import * as Styles from './styles'

type RootInputAttrs = Pick<InputHTMLAttributes<HTMLInputElement>,
  'name'
  | 'id'
  | 'onChange'
  | 'onBlur'
  | 'onFocus'
  | 'value'
  | 'disabled'
  | 'autoFocus'
>

interface TextFieldProps extends RootInputAttrs {
  label?: string
}

const BaseTextField = forwardRef<HTMLInputElement ,TextFieldProps>(({ 
  label,
  ...props
}, ref) => {
  return (
    <Styles.Container>
      {label && <Styles.Label htmlFor={props?.id}>{label}</Styles.Label>}
      <Styles.Input ref={ref} {...props} />
    </Styles.Container>
  )
})

export const TextField = memo(BaseTextField)