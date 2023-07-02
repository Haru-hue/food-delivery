/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    container: {
      center: true
    },
    
    extend: {
      colors: {
        orange: "#F4572B",
        'orange-lighter': '#e67555',
      },
      width: {
        '500': '500px',
        'lg': '1280px'
      }
    },
  },
  plugins: [],
}