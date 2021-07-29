module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        dropShadow: {
          'red-md': '0 4px 3px rgba(173, 19, 19, 0.304)',
          'blue-md': '0 4px 3px rgba(59, 131, 246, 0.304)',
          'green-md': '0 4px 3px rgba(16,185,129, 0.304)'
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
