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
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
}