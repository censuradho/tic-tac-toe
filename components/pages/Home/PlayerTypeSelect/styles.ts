import { styled } from "stitches.config";

export const Container = styled('button', {
  width: '100%',
  background: 'transparent',
  padding: '$sm $md',
  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    selected: {
      true: {
        background: '$gray'
      }
    }
  }
})