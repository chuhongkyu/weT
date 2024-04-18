import HeadComponent from '@/app/_components/common/Head';
import '@/styles/globals.css'
import { noto } from '@/utils/font';
import MainLayOut from '@/app/_components/common/MainLayOut';
import AuthSession from '@/app/_components/common/AuthSession';
import RQProvider from './_components/common/RQProvider';

type Props = {
  children: React.ReactNode,
};
export default function RootLayout({
  children
}: Props) {
  return (
    <html lang="ko">
      <HeadComponent/>
      <body className={noto.className}>
        {/* <AuthSession> */}
          <RQProvider>  
          <MainLayOut>
          
          {children}
          
          </MainLayOut>
          </RQProvider>
        {/* </AuthSession> */}
      </body>
    </html>
  )
}
