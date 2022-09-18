/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/options.{html,js }", 
    "./src/popup.{html,js}",
    "./src/components/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var'],
      },
    },
  },
  plugins: [],
}
