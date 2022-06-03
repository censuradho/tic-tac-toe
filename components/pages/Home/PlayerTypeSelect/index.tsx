import { memo } from 'react'
import type { VariantProps } from '@stitches/react'

import * as Styles from './styles'
import { IconNames, Icon } from 'components/base'

type StyleVariant = VariantProps<typeof Styles.Container>

type PlayerType = 'x' | 'o'

interface PlayerTypeSelectProps extends StyleVariant {
  type: PlayerType;
  onSelect?: () => void;
}

function BasePlayerTypeSelect ({
  selected,
  type,
  onSelect
}: PlayerTypeSelectProps) {
  const playerTypeIcon: Record<PlayerType, IconNames> = {
    o: 'square',
    x: 'x'
  }

  return (
    <Styles.Container
      onClick={onSelect}
      selected={selected}
    >
      <Icon 
        name={playerTypeIcon[type]} 
        color={selected ? 'background' : 'gray'} 
      />
    </Styles.Container>
  )
}

export const PlayerTypeSelect = memo(BasePlayerTypeSelect)