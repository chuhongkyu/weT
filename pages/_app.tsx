import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react';
import HeadComponent from 'components/common/Head';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) { 

  const pathname = usePathname()

  return (
    <>
      <HeadComponent/>
      <SessionProvider session={pageProps.session}>
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} key={pathname + "KEY"}/>
          </AnimatePresence>
      </SessionProvider>
    </>
    )
}