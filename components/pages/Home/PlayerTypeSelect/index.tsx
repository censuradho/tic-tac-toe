import { memo } from 'react'
import type { VariantProps } from '@stitches/react'

import * as Styles from './styles'
import { IconNames, Icon } from 'components/base'
import { playerTypeIcon } from 'constants/game'

type StyleVariant = VariantProps<typeof Styles.Button>

interface PlayerTypeSelectProps extends StyleVariant {
  type: string;
  onSelect?: () => void;
  disabled?: boolean
}

function BasePlayerTypeSelect ({
  selected,
  type,
  onSelect,
  disabled
}: PlayerTypeSelectProps) {


  return (
    <Styles.Button
      onClick={onSelect}
      selected={selected}
      disabled={disabled}
    >
      {playerTypeIcon[type] && <Icon 
        name={playerTypeIcon[type]} 
        color={selected ? 'background' : 'gray'} 
      />}
    </Styles.Button>
  )
}

export const PlayerTypeSelect = memo(BasePlayerTypeSelect)