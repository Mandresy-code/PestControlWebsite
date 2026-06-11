import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#f4f6fa",
          100: "#e6eaf2",
          200: "#c8d2e3",
          300: "#9fb0cd",
          400: "#6c83a8",
          500: "#47597f",
          600: "#33445f",
          700: "#243250",
          800: "#162343",
          900: "#0E1F3D",
          950: "#091428",
        },
        cream: {
          DEFAULT: "#F5F1E8",
          2:       "#EFEAE0",
        },
        paper: "#FFFFFF",
        signal: {
          50:  "#f6f8f2",
          100: "#ecf0e5",
          200: "#d5e0c5",
          300: "#b8c49e",
          400: "#9aac79",
          500: "#B8C49E",
          600: "#7a9360",
          700: "#5e7248",
          800: "#4a5a39",
          900: "#3c4930",
        },
        terra: {
          400: "#CC7550",
          500: "#B85C38",
          600: "#A34D2D",
          700: "#8C3F24",
        },
        success: "#2F8F5E",
        warning: "#C48A1C",
        danger:  "#B83A2E",
        info:    "#2A6FBF",
      },
      fontFamily: {
        sans:  ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        display: ["clamp(52px,8vw,88px)",  { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "500" }],
        h1:      ["clamp(38px,5.5vw,60px)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "500" }],
        h2:      ["clamp(28px,3.8vw,42px)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "500" }],
        h3:      ["clamp(20px,2.5vw,28px)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.45" }],
        body:    ["16px", { lineHeight: "1.45" }],
        eyebrow: ["12px", { lineHeight: "1.4",  letterSpacing: "0.14em", fontWeight: "500" }],
        mono:    ["14px", { lineHeight: "1.4" }],
      },
      spacing: {
        "4":   "4px",
        "8":   "8px",
        "12":  "12px",
        "16":  "16px",
        "20":  "20px",
        "24":  "24px",
        "32":  "32px",
        "40":  "40px",
        "56":  "56px",
        "72":  "72px",
        "96":  "96px",
        "128": "128px",
      },
      borderRadius: {
        xs:   "4px",
        sm:   "6px",
        md:   "10px",
        lg:   "16px",
        xl:   "24px",
        pill: "999px",
      },
      boxShadow: {
        "1": "0 1px 3px 0 rgba(14,31,61,0.08), 0 1px 2px -1px rgba(14,31,61,0.06)",
        "2": "0 4px 12px -2px rgba(14,31,61,0.10), 0 2px 6px -2px rgba(14,31,61,0.08)",
        "3": "0 8px 24px -4px rgba(14,31,61,0.12), 0 4px 12px -4px rgba(14,31,61,0.08)",
        "4": "0 16px 48px -8px rgba(14,31,61,0.16), 0 8px 20px -6px rgba(14,31,61,0.10)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22,1,0.36,1)",
      },
      transitionDuration: {
        micro:    "140ms",
        standard: "220ms",
        section:  "420ms",
      },
      screens: {
        sm:  "620px",
        md:  "980px",
        lg:  "1200px",
        xl:  "1440px",
      },
      backgroundImage: {
        "noise": "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
