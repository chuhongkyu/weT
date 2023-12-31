import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Head from 'next/head'
import HeadComponent from 'components/Head';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) { 

  const pathname = usePathname()

  return (
    <>
      <HeadComponent/>
      <SessionProvider session={pageProps.session}>
        <RecoilRoot>
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} key={pathname + "KEY"}/>
          </AnimatePresence>
        </RecoilRoot>
      </SessionProvider>
    </>
    )
}