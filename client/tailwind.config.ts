import scrollbarHide from "tailwind-scrollbar-hide";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik, sans-serif"],
        cursive: ["Edu TAS Beginner", "cursive"],
      },
    },
  },
  plugins: [scrollbarHide],
};

export default config;
