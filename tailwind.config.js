/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        subtleMove: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        subtleMove: 'subtleMove 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
