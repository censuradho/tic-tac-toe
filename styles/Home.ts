import { styled } from "stitches.config";

export const Main = styled('main', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Container = styled('div', {
  width: '100%',
  maxWidth: '31.25rem',
})

export const PlayerSection = styled('div', {
  background: '$foreground',
  padding: '$sm',
  width: '100%',
  borderRadius: '$md',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
})

export const PlayerTitle = styled('h1', {
  textTransform: 'uppercase',
  fontSize: '$md',
  textAlign: 'center'
})

export const PlayerDescription = styled('span', {
  textTransform: 'uppercase',
  fontSize: '$sm',
  display: 'inline-block',
  marginTop: '1rem',
  fontWeight: 'bold',
  width: '100%',
  textAlign: 'center',
  color: '$grayDark'
})

export const PlayerTypeContainer = styled('div', {
  background: '$background',
  borderRadius: '$sm',
  padding: '$sm',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)'
})