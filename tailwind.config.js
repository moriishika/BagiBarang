module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    fill: ['hover', 'focus'],
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
