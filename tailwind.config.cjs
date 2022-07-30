// @ts-check

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        captcha: { blue: "#1a73e8", gray: "#727272" },
      },
    },
  },

  plugins: [],
};

module.exports = config;
