import { memo } from 'react'
import type * as Stitches from '@stitches/react';
import {
  MdClose,
} from '@meronex/icons/ios';
import { IconType } from '@meronex/icons';

import SquareIcon from 'assets/square.svg'

import XIcon from 'assets/x.svg'

import { theme } from 'stitches.config'

const icons = {
  square: SquareIcon,
  x: XIcon,
  close: MdClose
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
  const Component = icons[name] as IconType | React.FC<React.SVGProps<SVGSVGElement>>

  return (
    <Component 
      height={size}
      fill={theme.colors[color] as any}
      size={size}
    />
  )
}

export const Icon = memo(BaseIcon)