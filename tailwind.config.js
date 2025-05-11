// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'goshorty-blue': '#00AEEF',
        'goshorty-dark': '#1A2E35',
        'goshorty-gray': '#F7F8F9',
        'goshorty-text-default': '#4A4A4A',
        'goshorty-text-light': '#7B8B92',
        'gs-tarmac': '#1d1e2c',
      },
      fontFamily: {
        sans: [
          'TT Norms Pro',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segue UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        heading: ['TT Norms Pro Serif DemiBold', 'serif'],
        'tt-norms': ['TT Norms Pro Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}