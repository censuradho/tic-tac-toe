import { CSSProperties, memo, ReactNode } from 'react'

type Styles = Pick<CSSProperties, 
  | 'flexDirection'
  | 'flex'
  | 'alignItems'
  | 'justifyContent'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
> & { 
  gap?: number 
}

interface GridProps extends Styles {
  children: ReactNode
}

function BaseGrid ({
  children,
  gap,
  ...props
}: GridProps) {
  return (
    <div 
      style={{
        display: 'grid',
        gap: `${gap}rem`,
        ...props
      }}
    >
      {children}
    </div>
  )
}

export const Grid = memo(BaseGrid)