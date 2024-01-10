import Footer from 'components/Footer';
import { Suspense } from 'react';
import Loading from './Loading';
import { motion } from "framer-motion"
import Nav from './Nav';
import localFont from 'next/font/local'

const noto = localFont({
  variable: '--font-noto',
  src: [
    {
      path: 'fonts/NotoSansKR400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/NotoSansKR500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/NotoSansKR700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default function MainLayOut({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-noto">
      <Suspense>
        <Nav/>
        <motion.div 
          className="w-full" 
          initial={{opacity: 0}} 
          animate={{opacity: 1, transition: {duration: 0.3}}}
          exit={{opacity: 0, transition: {duration: 0.3}}}
          >
            <Suspense fallback={<Loading/>}>{children}</Suspense>
        </motion.div>
        <Footer />
      </Suspense>
    </main>
  );
}