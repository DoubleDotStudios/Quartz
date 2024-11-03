/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}', './src/renderer/src/store/themes.json'],
  theme: {
    extend: {
      colors: {
        classic: '#29292b',
        obsidian: '#2e293a',
        deep_obsidian: '#140e17',
        amethyst: '#9370DB',
        rustic: '#5c544f',
        space: '#1A0336',
        cool_ocean: '#008080',
        warm_ocean: '#009b7d',
        scarlet_embers: '#9e0d0d',
        deep_amethyst: '#49265f',
        pink_lavender_dark: '#0c0611',
        rose_quartz: '#90758d',
        deep_forest: '#26332A',
        deep_space: '#110223',
        deep_rustic: '#3a3331',
        forest: '#4D5F4F',
        deep_marine: '#00416a',
        jade: '#00703e',

        // Solarized Colors
        solarized_dark: '#002b36',
        solarized_light: '#fdf6e3',

        // Nord Colors
        aurora_red: '#bf616a',
        aurora_orange: '#d08770',
        aurora_yellow: '#d8a657',
        aurora_green: '#a3be8c',
        aurora_pink: '#b48ead',
        nord_blue: '#81a1c1',
        nord_night: '#2e3440',

        // Catppuccin Colors
        latte: '#eff1f5',
        frappe: '#303446',
        macchiato: '#24273a',
        mocha: '#1e1e2e',

        // Text Colors
        text_default: '#fafafa',
        text_latte: '#4c4f69',
        text_frappe: '#c6d0f5',
        text_macchiato: '#cad3f5',
        text_mocha: '#cdd6f4',
        text_pink_lavender_dark: '#eed8e5',

        // Link Colors
        link_default: '#00FFFF',
        link_latte: '#1e66f5',
        link_frappe: '#8caaee',
        link_macchiato: '#8aadf4',
        link_mocha: '#89b4fa',
        link_pink_lavender_dark: '#B292AC',

        // Active Link Colors
        link_pink_lavender_dark_active: '#C8A3BC'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'selector'
}
