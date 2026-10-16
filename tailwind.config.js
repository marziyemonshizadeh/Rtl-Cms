import animate from "tailwindcss-animate";

// Full CSS colors (names, hex, rgb, hsl) with Tailwind opacity modifiers.
const themeColor = (name) =>
  `color-mix(in srgb, var(--${name}) calc(<alpha-value> * 100%), transparent)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: themeColor("background"),
        foreground: themeColor("foreground"),
        card: {
          DEFAULT: themeColor("card"),
          foreground: themeColor("foreground"),
        },
        popover: {
          DEFAULT: themeColor("popover"),
          foreground: themeColor("foreground"),
        },
        primary: {
          DEFAULT: themeColor("primary"),
          foreground: themeColor("primary-foreground"),
        },
        muted: {
          DEFAULT: themeColor("muted"),
          foreground: themeColor("muted-foreground"),
        },
        accent: {
          DEFAULT: themeColor("muted"),
          foreground: themeColor("foreground"),
        },
        destructive: {
          DEFAULT: themeColor("destructive"),
          foreground: themeColor("destructive-foreground"),
        },
        success: themeColor("success"),
        warning: themeColor("warning"),
        info: themeColor("info"),
        overlay: themeColor("overlay"),
        sidebar: {
          DEFAULT: themeColor("sidebar-background"),
          foreground: themeColor("sidebar-foreground"),
          "muted-foreground": themeColor("sidebar-muted-foreground"),
          accent: themeColor("sidebar-accent"),
          border: themeColor("sidebar-border"),
          primary: themeColor("sidebar-primary"),
          "primary-foreground": themeColor("sidebar-primary-foreground"),
        },
        border: themeColor("border"),
        input: themeColor("border"),
        ring: themeColor("primary"),
      },
    },
  },
  plugins: [animate],
};
