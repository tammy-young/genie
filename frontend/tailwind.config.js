/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A87CFC',
          light: '#f6f1fe'
        },
        fashion: {
          DEFAULT: '#ee6fb3',
          light: '#fdd4dc',
          dark: '#650f3d'
        },
        interior: {
          DEFAULT : '#51c0cb',
          light: '#d4fafd',
          dark: '#016c95'
        }
      },
    },
  },
  plugins: [],
}
