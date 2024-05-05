/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#2e293a',
        deep_obsidian: '#140e17',
        amethyst: '#9370DB',
        rustic: '#3a322d',
        space: '#1A0336',
        cool_ocean: '#008080',
        warm_ocean: '#009b7d',
        scarlet_embers: '#9e0d0d',
        deep_amethyst: '#49265f',
        dark_frequencies: '#1e1321',
        rose_quartz: '#90758d',
        deep_forest: '#152218',
        deep_space: '#110223',
        deep_rustic: '#292220',
        forest: '#2B3D2F',
        deep_marine: '#00416a',
        jade: '#00703e'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'selector'
}
