// @ts-check

import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import { VitePWA } from "vite-plugin-pwa";

import path from "node:path";

/** @type {{ [key: string]: string }} */
const generatedAliases = {};

["components", "data", "icons"].map(
  (ele) => (generatedAliases[`\$${ele}`] = path.resolve(`src/${ele}`))
);

/** @type {import("@sveltejs/kit").Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    vite: {
      resolve: {
        alias: generatedAliases,
      },
      plugins: [
        VitePWA({
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
    },
  },
};
