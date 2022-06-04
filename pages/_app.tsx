import { GameProvider } from 'context'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { globalStyle } from 'stitches.config'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    globalStyle()
  }, [])
  
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  )
}

export default MyApp
