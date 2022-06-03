import { styled } from "stitches.config";

export const Overlay = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, .2)',
  backdropFilter: 'blur(10px)',
  position: 'fixed',
  top: 0,
  left: 0
})

export const Container = styled('div', {
  padding: '$sm',
  borderRadius: '$md',
  background: '$background',
  minWidth: '5rem',
  minHeight: '5rem'
})