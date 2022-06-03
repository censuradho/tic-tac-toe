import { memo } from 'react'
import type * as Stitches from '@stitches/react';


import SquareIcon from 'assets/square.svg'

import XIcon from 'assets/x.svg'

import { theme } from 'stitches.config'

const icons = {
  square: SquareIcon,
  x: XIcon,
}

export type IconNames = keyof typeof icons

interface IconProps {
  name: IconNames;
  color?: keyof typeof theme.colors;
  size?: number
}
/**
 * default theme
*/
function BaseIcon ({ 
  name,
  color = 'gray',
  size = 30
}: IconProps) {
  const Component = icons[name]

  return (
    <Component 
      height={size} 
      fill={theme.colors[color]}
    />
  )
}

export const Icon = memo(BaseIcon)