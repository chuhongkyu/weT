import localFont from 'next/font/local'

export const noto = localFont({
    variable: '--font-noto',
    src: [
      {
        path: '../fonts/NotoSansKR400.woff2',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../fonts/NotoSansKR500.woff2',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../fonts/NotoSansKR700.woff2',
        weight: '700',
        style: 'normal',
      },
    ],
    display: 'swap',
})