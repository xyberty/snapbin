import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        grape: "#000000",
        'light-grape': "#FFFFFF",
        lavender: "#AAAAAA",
        'dark-lavender': "#333333",
      },
      fontFamily: {
        commit: "Commit Mono",
        literata: ["Literata", "serif"],
      },
    },
  },

  plugins: [],
} satisfies Config;
