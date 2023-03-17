/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primaryTitle: "#4F4F4F",
        primaryParagraph: "#828282",
        verified: "#219653",
      },
      boxShadow: {
        MainShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
