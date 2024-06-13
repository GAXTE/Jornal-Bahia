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
      fontFamily: {
        primaryFont: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "14px": "14px",
        "16px": "16px",
        "18px": "18px",
        "20px": "20px",
        "24px": "24px",
        "32px": "32px",
        "48px": "48px",
        "64px": "64px",
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 600,
        bold: 700,
      },
      lineHeight: {
        "19.5px": "19.5px",
        "32px": "32px",
        "48px": "48px",
        "64px": "64px",
      },
    },
    colors: {
      primaryRed: "#FF0000",
      bodyColor: "#F3F3F3",
      black: "#000000",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
