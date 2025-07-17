// import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6a1a",
        black: "#212337",
        green: "#749b3f",
        grey100: "#4a4a52",
        grey80: "#d9d9d9",
        grey20: "#f4f6f6",
      },
      fontFamily: {
        heading: ["Rubik", "sans-serif"],
        body: ["Questrial", "sans-serif"],
      },
      fontSize: {
        h1: ["80px", { letterSpacing: "-0.02em", fontWeight: "500" }],
        h2: ["48px", { letterSpacing: "-0.02em", fontWeight: "500" }],
        h3: ["40px", { letterSpacing: "-0.02em", fontWeight: "400" }],
        h4: ["32px", { letterSpacing: "-0.02em", fontWeight: "600" }],
        body: ["20px", { lineHeight: "32px", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};
