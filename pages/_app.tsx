import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { globalStyle } from 'stitches.config'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    globalStyle()
  }, [])
  
  return <Component {...pageProps} />
}

export default MyApp
