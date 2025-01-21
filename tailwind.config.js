/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: '#FFEB88',
        secondary: '#E66C55',
        tertiary: '#FBF8E9',
        azul: '#3060A0',
        font: '#3d3d3d',
      },
    },
  },
  plugins: [],
}
