import { CSSProperties, memo, ReactNode } from 'react'

type Styles = Pick<CSSProperties, 
  | 'flexDirection'
  | 'flexWrap'
  | 'flex'
  | 'alignItems'
  | 'justifyContent'
> & { 
  gap?: number 
}

interface FlexProps extends Styles {
  children: ReactNode
}

function BaseFlex ({
  children,
  gap,
  ...props
}: FlexProps) {
  return (
    <div 
      style={{
        display: 'flex',
        gap: `${gap}rem`,
        ...props
      }}
    >
      {children}
    </div>
  )
}

export const Flex = memo(BaseFlex)