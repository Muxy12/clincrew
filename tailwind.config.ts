import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core dark palette (from the approved theme)
        bg: "#07131b",
        panel: "#0d2029",
        "panel-strip": "#0b1b24",
        cream: "#eef3ef",
        muted: "#9db0b5",
        mint: "#b6f4d7",
        teal: "#56bfae",
        line: "#28414a",
        // Light sections
        "light-bg": "#eaf0eb",
        "light-ink": "#0a2428",
        "light-muted": "#5a7172",
        "light-line": "#bfd1cb",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-.06em",
        tighter2: "-.04em",
      },
      maxWidth: {
        wrap: "1180px",
      },
      keyframes: {
        float: {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(-30px,30px)" },
        },
        levitate: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-18px)" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "80%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 10s ease-in-out infinite alternate",
        levitate: "levitate 7s ease-in-out infinite alternate",
        "scroll-dot": "scroll-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
