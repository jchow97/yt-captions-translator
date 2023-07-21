/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./popup/**/*.{html,js}",
      "./scripts/**/*.{html,js}"
  ],
  theme: {
    extend: {
        minHeight: {
            800: '50rem',
            600: '37.5rem',
            400: '25rem',
            300: '18.75rem',
        },
        minWidth: {
            600: '37.5rem',
            400: '25rem',
            300: '18.75rem',
            200: '12.5rem'
        }
    },
  },
  plugins: [],
}

