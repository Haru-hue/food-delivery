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
        orange: "#F4572B"
      },
      width: {
        '500': '500px'
      }
    },
  },
  plugins: [],
}