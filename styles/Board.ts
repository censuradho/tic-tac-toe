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
  },

  variants: {
    variant: {
      primary: {
        'svg': {
          fill: '$primary'
        },
      },
      secondary: {
        'svg': {
          fill: '$secondary'
        },
      }
    }
  }
})

export const Info = styled('div', {
  width: '100%',
  borderRadius: '$sm',
  padding: '1rem 0',
  boxShadow: '$sm',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$lg',
  fontWeight: 600,
  flexDirection: 'column',
  gap: '0.5rem',

  'span': {
    fontWeight: 500,
    fontSize: '$sm',
    color: 'inherit'
  },
  color: '$background',

  variants: {
    variant: {
      primary: {
        background: '$primary'
      },
      secondary: {
        background: '$secondary'
      }
    }
  }
})