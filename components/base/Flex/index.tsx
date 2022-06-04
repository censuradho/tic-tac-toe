import { CSSProperties, memo, ReactNode } from 'react'

type Styles = Pick<CSSProperties, 
  | 'flexDirection'
  | 'flexWrap'
  | 'flex'
  | 'alignItems'
  | 'justifyContent'
> & { 
  gap?: number;
  fullWidth?: boolean
}

interface FlexProps extends Styles {
  children: ReactNode
}

function BaseFlex ({
  children,
  gap,
  fullWidth,
  ...props
}: FlexProps) {
  return (
    <div 
      style={{
        display: 'flex',
        gap: `${gap}rem`,
        width: fullWidth ? '100%' : 'auto',
        ...props
      }}
    >
      {children}
    </div>
  )
}

export const Flex = memo(BaseFlex)