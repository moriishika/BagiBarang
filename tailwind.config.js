module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        dropShadow: {
          'red-md': '0 4px 3px rgba(173, 19, 19, 0.404)'
        }
    }
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
