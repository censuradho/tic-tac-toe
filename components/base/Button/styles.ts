import { styled } from "stitches.config";

export const Button = styled('button', {
  padding: '$sm $md',
  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$background',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  transition: 0.2,
  
  '&:hover, &:focus': {
    opacity: 0.8
  },

  '&[disabled]': {
    opacity: 0.4,
    cursor: 'default'
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%'
      }
    },
    variant: {
      primary: {
        background: '$primary'
      },
      secondary: {
        background: '$secondary'
      }
    }
  },
  defaultVariants: {
    variant: 'primary'
  }

})