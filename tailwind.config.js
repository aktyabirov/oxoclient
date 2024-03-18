/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
    center: true,
    padding: "20px",
    screens: {
      'xl': '1200px'
    }
    },
    extend: {
      colors: {
        "primary" : "#19191C",
        "secondary": "#F6F6F6",
        "thirdary" : "#979C9E",
        "darkgrey" : "#888888",
      }
    },
  },
  plugins: [],
};
