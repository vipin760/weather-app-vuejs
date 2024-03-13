/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "weather-primary":"#133955",
        "weather-secondary":"#696667FF",
      }
    },
  },
  plugins: [],
}

