import Footer from 'components/Footer';
import { Suspense } from 'react';
import Loading from './Loading';

export default function MainLayOut({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="w-full">
        <Suspense fallback={<Loading/>}>{children}</Suspense>
      </div>
      <Footer />
    </Suspense>
  );
}