/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        noto: ['var(--font-noto)'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}',],
}