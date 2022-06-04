import { styled } from "stitches.config";

export const Button = styled('button', {
  padding: '.3rem',

  '&:hover': {
    background: 'rgba(0, 0, 0, .2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  }
})