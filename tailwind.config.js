/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'mynerve': ['Mynerve', 'sans-serif']
      }
    },
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}