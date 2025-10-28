/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0f9',
          100: '#cce1f3',
          200: '#99c3e7',
          300: '#66a5db',
          400: '#3387cf',
          500: '#0056A7',
          600: '#004586',
          700: '#003465',
          800: '#002344',
          900: '#001223',
        },
        accent: {
          500: '#FF6B35',
          600: '#E55A2B',
        }
      },
    },
  },
  plugins: [],
}
