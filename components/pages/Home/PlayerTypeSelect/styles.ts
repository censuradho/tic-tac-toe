import { styled } from "stitches.config";

export const Button = styled('button', {
  width: '100%',
  background: 'transparent',
  padding: '$sm $md',
  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:[disabled]': {
    opacity: 0.2,
    cursor: 'default'
  },

  variants: {
    selected: {
      true: {
        background: '$gray'
      }
    }
  }
})