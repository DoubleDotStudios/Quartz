/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#140e17',
        amethyst: '#49265f',
        rustic: '#3a322d',
        dark_frequencies: '#1e1321',
        rose_quartz: '#90758d',
        deep_forest: '#152218',
        deep_space: '#110223'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'selector'
}
