import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        grape: "#000000",
        lavender: "#AAAAAA",
      },
      fontFamily: {
        commit: "Commit Mono",
      },
    },
  },

  plugins: [],
} satisfies Config;
