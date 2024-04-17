import HeadComponent from '@/app/_components/common/Head';
import '@/styles/globals.css'
import { noto } from '@/utils/font';
import MainLayOut from '@/app/_components/common/MainLayOut';
import AuthSession from '@/app/_components/common/AuthSession';

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
        <AuthSession>
          <MainLayOut>
          {children}
          </MainLayOut>
        </AuthSession>
      </body>
    </html>
  )
}
