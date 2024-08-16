/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        wite:'#FFFFFF',
        black:'#262626',
        // lightPurp:'#6C69DA',
        lightPurp:'#8f40c4',
        darkPurp:'#292861',
        lightBg:'#ECEBF2'
    }
    },
  },
  plugins: [],
}