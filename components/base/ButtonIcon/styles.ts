import { styled } from "stitches.config";

export const Button = styled('button', {
  padding: '.3rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  '&:hover, &:focus': {
    background: 'rgba(0, 0, 0, .2)',
  }
})