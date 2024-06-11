/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1120px",
        },
      },
      spacing: {
        "19px": "19px",
      },
    },
    colors: {
      primaryRed: "#FF0000",
    },
  },
  plugins: [],
};
