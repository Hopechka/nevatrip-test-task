/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '375px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px'
    },
    colors: {
      'regal-grey': '#9E9E9E',
      'b-grey': '#828282',
      'description-grey': '#4B4B4B',
      'time-grey': '#343434',
      'time-bg':'#D9E8FF',
      'btn-bg':'#FED74B',
      'btn-border':'#CBA500' 
    },
  },
  plugins: [],
}
}