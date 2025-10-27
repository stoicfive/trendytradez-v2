/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // TrendyTradez brand colors
        brand: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#0f62fe',
          600: '#0d52d1',
          700: '#0a42a4',
          800: '#083277',
          900: '#05224a',
        },
      },
    },
  },
  plugins: [],
};
