import 'styles/globals.css'
import 'styles/_entry.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const resizeHandler = () => {
    document.documentElement.style.setProperty('--vw', window.innerHeight * 0.01 + 'px');
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');
  }

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])
  
  return (
    <>
      <Head>
        <title>We T - OTT 플랫폼 비교 - 넷플릭스, 왓챠, Tving, Wave</title>
        <meta name="description" content="오티티 플랫폼들의 내용을 비교하여 최적의 선택을 도와주는 사이트입니다." />
        <meta name="keywords" content="OTT, 오티티, 넷플릭스, 왓챠, Tving, Wave, OTT 비교, OTT 추천" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence>
        <SessionProvider session={pageProps.session}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </SessionProvider>
      </AnimatePresence>
    </>
    )
}