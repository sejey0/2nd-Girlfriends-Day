/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f2f7f4',
          100: '#e1ede5',
          200: '#c5dccf',
          300: '#9ec3b0',
          400: '#75a48b',
          500: '#55876f',
          600: '#416b57',
          700: '#355647',
          800: '#2c463b',
          900: '#253a32',
          950: '#131f1a',
        },
        lavender: {
          50: '#f7f6fb',
          100: '#efebf6',
          200: '#e0d8ed',
          300: '#cabcdb',
          400: '#ae9ac5',
          500: '#947aa7',
          600: '#7a5e8c',
          700: '#644b72',
          800: '#543f5e',
          900: '#47364e',
          950: '#271c2d',
        },
        dustypink: {
          50: '#fdf6f7',
          100: '#faeaec',
          200: '#f6d8dc',
          300: '#eebac2',
          400: '#e3909e',
          500: '#d46b7e',
          600: '#be4e64',
          700: '#9f3c50',
          800: '#853545',
          900: '#71313e',
          950: '#3e161f',
        },
        darkbg: '#0c100e',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
