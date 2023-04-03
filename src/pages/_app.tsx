import '@/styles/globals.css'
import ApplicationProvider from '@/services/Application'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <ApplicationProvider>
    <Component {...pageProps} />
  </ApplicationProvider>
}
