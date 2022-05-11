// @ts-check

/** @type {import("@playwright/test").PlaywrightTestConfig} */
export default {
  webServer: {
    command: "yarn build && yarn preview",
    port: 3000,
  },
};
