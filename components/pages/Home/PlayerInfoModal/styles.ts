import { styled } from "stitches.config";

export const Container = styled('div', {
  width: '100vw',
  maxWidth: '35rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem'
})

export const Title = styled('strong', {
  fontSize: '$lg',
  fontWeight: 500
})