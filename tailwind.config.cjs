// @ts-check

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        captcha: "#1a73e8",
      },
    },
  },

  plugins: [],
};

module.exports = config;
