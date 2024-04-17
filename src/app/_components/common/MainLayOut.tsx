import Footer from './Footer';
import { Suspense } from 'react';
import Loading from './Loading';
import Nav from './Nav';

export default function MainLayOut({ children }: { children: React.ReactNode }) {
  return (
      <main>
        <Nav/>
        <div className="w-full">
            <Suspense fallback={<Loading/>}>{children}</Suspense>
        </div>
        <Footer />
      </main>
  );
}