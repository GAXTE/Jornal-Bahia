import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
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
    },
    colors: {
      primary: "#FF4A57",
      secondary: "#FFD600",
      black: "#000000",
      white: "#FFFFFF",
      gray: "#efefef",
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".title-1": {
          fontFamily: "var(--font-primary)",
          fontSize: "32px",
          color: "var(--color-black)",
          fontWeight: "800",
          lineHeight: "39.01px",
        },
        ".tittle-1-mobile": {
          fontFamily: "var(--font-primary)",
          fontSize: "22px",
          color: "var(--color-black)",
          fontWeight: "800",
          lineHeight: "26.82px",
        },
        ".tittle-list-post": {
          fontFamily: "var(--font-primary)",
          fontSize: "24px",
          color: "var(--color-black)",
          fontWeight: "800",
          lineHeight: "26.82px",
        },
        ".tittle-2": {
          fontFamily: "var(--font-primary)",
          fontSize: "20px",
          color: "var(--color-black)",
          fontWeight: "800",
          lineHeight: "30px",
        },
        ".tittle-2-mobile": {
          fontFamily: "var(--font-primary)",
          fontSize: "16px",
          color: "var(--color-black)",
          fontWeight: "800",
          lineHeight: "26.82px",
        },
        ".tittle-3-": {
          fontFamily: "var(--font-primary)",
          fontSize: "16px",
          color: "var(--color-black)",
          fontWeight: "800",
          lineHeight: "30px",
        },
        ".label": {
          fontFamily: "var(--font-primary)",
          fontSize: "16px",
          color: "var(--color-primary)",
          fontWeight: "800",
          lineHeight: "19.05px",
        },
        ".label-mobile": {
          fontFamily: "var(--font-primary)",
          fontSize: "14px",
          color: "var(--color-primary)",
          fontWeight: "800",
          lineHeight: "17.07px",
        },
        ".label-category": {
          fontFamily: "var(--font-primary)",
          fontSize: "14px",
          color: "var(--color-white)",
          fontWeight: "800",
          lineHeight: "17.07px",
          padding: "7px 13px",
          borderRadius: "4px",
        },
        ".opaque-text": {
          fontFamily: "var(--font-primary)",
          opacity: "0.5",
          fontSize: "14px",
          color: "var(--color-black)",
          fontWeight: "600",
          lineHeight: "17.07px",
        },
        ".menu-text": {
          fontFamily: "var(--font-primary)",
          fontSize: "16px",
          color: "var(--color-black)",
          fontWeight: "600",
          lineHeight: "19.05px",
        },
        ".paragraph-text": {
          fontFamily: "var(--font-primary)",
          opacity: "0.8",
          fontSize: "16px",
          color: "var(--color-primary)",
          fontWeight: "600",
          lineHeight: "19.05px",
        },
        ".footer-text": {
          fontFamily: "var(--font-primary)",
          opacity: "0.5",
          fontSize: "16px",
          color: "var(--color-black)",
          fontWeight: "500",
          lineHeight: "30px",
        },
      });
    }),
  ],
};
