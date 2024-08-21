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
    },
    keyframes: {
      vibrate: {
        '0%, 100%': { transform: 'translateX(0)' },
        '20%': { transform: 'translateX(-2px)' },
        '40%': { transform: 'translateX(2px)' },
        '60%': { transform: 'translateX(-2px)' },
        '80%': { transform: 'translateX(2px)' },
      },
      'slide-up-fade': {
        '0%': {
          transform: 'translateY(100%)',
          opacity: '0',
        },
        '100%': {
          transform: 'translateY(0)',
          opacity: '1',
        },
      },

      'slide-to-left-fade': {
        '0%': {
          transform: 'translateX(100%)',
          opacity: '0',
        },
        '100%': {
          transform: 'translateX(0)',
          opacity: '1',
        },
      },
      'slide-to-right-fade': {
        '0%': {
          transform: 'translateX(-100%)',
          opacity: '0',
        },
        '100%': {
          transform: 'translateX(0)',
          opacity: '1',
        },
      },
      'bounce-up':{
        '0%': {
          transform: 'translateY(100%)',
          opacity: '0',
        },
        '20%': {
          transform: 'translateY(-120%)',
          opacity: '0.6',
        },
        '40%': {
          transform: 'translateY(0)',
          opacity: '0.8',
        },
        '60%': {
          transform: 'translateY(-50%)',
          opacity: '1',
        },
        
        '100%': {
          transform: 'translateY(0)',
          opacity: '1',
        },
      }
    },



    animation: {
      vibrate: 'vibrate 0.5s ease-in ',
      slideupfade: 'slide-up-fade 1s ease-out',
      slidetoleftfade:'slide-to-left-fade 0.7s ease-out',
      menuslidetoleftfade:'slide-to-left-fade 0.5s ease-out',
      slidetorightfade:'slide-to-right-fade 0.7s ease-out ',
      bounceUp:'bounce-up 1s ease-out',
      openModal:'slide-up-fade 0.3s ease-out',
    }
    },
  },
  plugins: [],
}