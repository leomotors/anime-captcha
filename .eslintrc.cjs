// @ts-check

/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["svelte3", "@typescript-eslint", "simple-import-sort"],
  overrides: [
    { files: ["*.svelte"], processor: "svelte3/svelte3" },
    {
      files: ["*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  rules: {
    "prettier/prettier": "warn",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};

module.exports = config;
