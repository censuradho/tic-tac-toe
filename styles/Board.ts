import { styled } from "stitches.config";

export const Turn = styled('div', {
  padding: '0.5rem 1rem',
  background: '$foreground',
  borderRadius: '$sm',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$sm',
  gap: '1rem',
  fontWeight: 600
})

export const RestartButton = styled('button', {
  height: '3rem',
  width: '3rem',
  background: '$gray',
  borderRadius: '$sm',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$sm',
  gap: '1rem',
  fontWeight: 600,
  color: 'inherit',
  transition: '0.2s',
  
  'svg': {
    fill: '$background'
  },

  '&:hover': {
    opacity: 0.7
  }
})

export const ButtonBoard = styled('button', {
  // height: '9.7rem',
  // width: '9.7rem',
  background: '$foreground',
  height: '9.75rem',
  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$sm',
  transition: '0.2s',

  '&:hover': {
    opacity: 0.7
  }
})