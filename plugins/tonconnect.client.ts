// plugins/tonconnect.client.ts
import { defineNuxtPlugin } from "#app";
import { TonConnectUI } from "@tonconnect/ui";

export default defineNuxtPlugin((nuxtApp) => {
  const tonConnectUI = new TonConnectUI({
    manifestUrl: "https://future-topaz.vercel.app/tonconnect-manifest.json",
  });

  return {
    provide: {
      tonConnectUI,
    },
  };
});
