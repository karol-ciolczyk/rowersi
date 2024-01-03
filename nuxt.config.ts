import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  //...
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    //...
  ],
  vite: {
    plugins: [vuetify()],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  app: {
    head: {
      link: [
        {
          href: "https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css",
          rel: "stylesheet",
        },
        {
          href: "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css",
          rel: "stylesheet",
          type: "text/css",
        },
      ],
    },
  },
});
