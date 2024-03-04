import Footer from './Footer';
import { Suspense } from 'react';
import Loading from './Loading';
import { motion } from "framer-motion"
import Nav from './Nav';
import { noto } from 'utils/font';

export default function MainLayOut({ children }: { children: React.ReactNode }) {
  return (
    <main className={noto.className}>
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