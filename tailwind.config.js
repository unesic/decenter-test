/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          xl: '832px',
        }
      },
      colors: {
        crypto: {
          accent: '#01c38d',
          light: {
            50: '#ffffff',
            100: '#696e79',
          },
          dark: {
            50: '#132d46',
            100: '#272e3e',
            200: '#191e29',
          },
        }
      }
    },
  },
  plugins: [],
}

