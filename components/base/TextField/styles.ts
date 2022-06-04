import { styled } from "stitches.config";

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column'
})

export const Input = styled('input', {
  width: '100%',
  borderRadius: '$sm',
  background: 'rgba(0, 0, 0, .3)',
  border: '2px solid transparent',
  outline: 'none',
  fontSize: '$sm',
  letterSpacing: '0.05rem',
  padding: '1rem'
})

export const Label = styled('label', {
  fontSize: '$sm',
  fontWeight: 500
})