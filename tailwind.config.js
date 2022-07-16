const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["'Nunito Sans'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        light: {
          text: "hsl(200, 15%, 8%)",
          input: "hsl(0, 0%, 52%)",
          bg: "hsl(0, 0%, 98%)",
          card: "hsl(0, 0%, 100%)",
        },
        dark: {
          text: "hsl(0, 0%, 100%)",
          bg: "hsl(207, 26%, 17%)",
          card: "hsl(209, 23%, 22%)",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
