// @ts-check

/** @type {import("@playwright/test").PlaywrightTestConfig} */
export default {
  webServer: {
    command: "pnpm build && pnpm preview --port 6915",
    port: 6915,
  },
};
