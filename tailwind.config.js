/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        harvest: {
          bg: '#FCFBF7',
          cream: '#FDFBF7',
          linen: '#F7F3E9',
          amber: '#D97706',
          amberLight: '#F59E0B',
          amberDark: '#B45309',
          orange: '#EA580C',
          orangeLight: '#FB923C',
          orangeDark: '#C2410C',
          pine: '#166534',
          pineLight: '#15803D',
          slate: '#0F172A',
          slateMuted: '#475569',
          kvsBlue: '#002B49',
          kvsGold: '#EAA221'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
};
