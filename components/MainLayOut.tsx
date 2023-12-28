import Footer from 'components/Footer';
import { Suspense } from 'react';
import Loading from './Loading';

export default function MainLayOut({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">
          <Suspense fallback={<Loading/>}>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}