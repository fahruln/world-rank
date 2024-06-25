/** @type {import('tailwindcss').Config} */
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#1B1D1F",
      darkGray: "#282B30",
      gray: "#6C727F",
      white: "#D2D5DA",
      blue: "#4E80EE",
    },
    extend: {},
  },
  plugins: [formsPlugin],
};
