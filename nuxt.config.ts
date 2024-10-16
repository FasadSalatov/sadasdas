// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: false,
  css: ["~/assets/sass/root.sass"],
  modules: [
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/turnstile",
    "@nuxt/ui",
  ],
  googleFonts: {
    families: {
      Montserrat: [400, 500, 700],
      Inter: true,
    },
  },

  router: {
    prefetchLinks: true,
  },

  turnstile: {
    siteKey: "1x00000000000000000000AA",
  },

  runtimeConfig: {
    turnstile: {
      secretKey: "",
    },
  },

  app: {
    head: {
      script: [
        { src: "https://telegram.org/js/telegram-web-app.js", async: true },
      ],
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
    },
  },
  plugins: ["~/plugins/telegramSdk.ts"],
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 bottom-[unset]",
    },
  },
});
