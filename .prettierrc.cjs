// @ts-check

/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  semi: true,
  trailingComma: "es5",
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  pluginSearchDirs: false,
};

module.exports = config;
