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
        short_name: "Anime Captcha",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "en",
        scope: "/",
        description:
          "Just a Normal Captcha, you are not a robot? Then pass this Captcha!",
        theme_color: "#4790ff",
        icons: [
          {
            src: "recaptcha-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "recaptcha-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "recaptcha-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "recaptcha-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
