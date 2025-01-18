/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          // Primary Font: Plus Jakarta Sans
          'primary-regular': ['primary-regular', 'sans-serif'],
          'primary-bold': ['primary-bold', 'sans-serif'],
          'primary-light-italic': ['primary-light-italic', 'sans-serif'],
  
          // Secondary Font: SF Pro Display
          'secondary-regular': ['secondary-regular', 'sans-serif'],
          'secondary-bold': ['secondary-bold', 'sans-serif'],
          'secondary-light-italic': ['secondary-light-italic', 'sans-serif'],

          //On-demand
          'form-gradient-start': 'rgba(78, 217, 254, 0.3)', // 4ED9FE with 30% transparency
          'form-gradient-end': 'rgba(15, 87, 250, 0.3)',   // 0F57FA with 30% transparency
        },
      },
      colors: {
        primary: '#0E56FA', // Primary color
        secondary: '#17CAFA', // Secondary color
        text: '#02002E', // Text color
        subtitle: '#949393'
      },
    },
  },
  plugins: [],
};