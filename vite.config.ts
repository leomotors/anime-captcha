import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    sveltekit(),
    VitePWA({
      injectRegister: "script",
      registerType: "autoUpdate",
      manifest: {
        name: "Anime Captcha",
        short_name: "Anime Captcha",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "en",
        scope: "/",
        orientation: "any",
        description:
          "Just a Normal Captcha, you are not a robot? Then pass this Captcha!",
        theme_color: "#4790ff",
        categories: ["meme", "game", "entertainment"],
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
