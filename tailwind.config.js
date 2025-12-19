/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffd600',
        secondary: '#e7e7e7',
        accent: 'rgb(233, 35, 167)',
        heading: '#2e2e2e',
        'neutral-bg': '#f9f7f4',
      },
      fontFamily: {
        'helvetica': ['Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
