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
        brown: "#612C20",
          'brown-dark': "#3A0E03",
        lime: "#FED054"
      },
      width: {
        '500': '500px',
        'lg': '1280px',
        '7/10': '70%',
        '3/10': '30%',
        '1/20': '5%',
      }
    },
  },
  plugins: [],
}