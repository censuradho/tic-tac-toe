import { createStitches } from '@stitches/react'

const { styled, globalCss: GlobalCss, getCssText, theme, css, keyframes, createTheme } = createStitches({
  theme: {
    colors: {
      primary: '#30C4BC',
      secondary: '#F2B237',
      background: '#192A32',
      foreground: '#1F3540',
      gray: '#A8BEC9',
      grayDark: '#415762',
    },
    fonts: {
			text: 'Roboto, serif',
		},
    fontSizes: {
      lg: '1.5rem',
      md: '1rem',
      sm: '0.875rem',
      xs: '0.75rem'
    },
    radii: {
      sm: '0.31rem',
      md: '1.25rem'
    },
    shadows: {
      sm:  '0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2);'
    }
  },
})

const globalStyle =  GlobalCss({
  '*': {
		padding: '0',
		margin: '0',
		boxSizing: 'border-box',
		fontFamily: '$text',
		color: '$gray',
      /* width */
      '&::-webkit-scrollbar': {
        width: '10px',
      },
  
    /* Track */
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '100px'
  
    },
  
    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    }
	},
  button: {
		background: 'none',
		border: 'none',
		cursor: 'pointer'
	},
  body: {
		backgroundColor: '$background',
		width: '100%',
		height: '100%'
	},
	li: {
		listStyle: 'none'
	},
  a: {
    textDecoration: 'none',
    cursor: 'pointer'
  },
})

export {
  styled, 
  getCssText, 
  theme, 
  css, 
  keyframes, 
  createTheme,
  globalStyle
}