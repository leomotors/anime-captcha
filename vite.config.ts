import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      manifest: {
        name: "Anime Captcha",
        description:
          "Just a Normal Captcha, you are not a robot? Then pass this Captcha!",
      },
    }),
  ],
});
