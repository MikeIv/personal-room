import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  ssr: false,
  srcDir: "app",
  compatibilityDate: "2024-12-01",
  devtools: { enabled: true },
  devServer: {
    port: 3000,
  },
  typescript: {
    strict: true,
  },
  alias: {
    "@": "./app",
    images: "./app/assets/images",
    style: "./app/assets/styles",
  },
  css: ["~/assets/styles/main.scss"],
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/icon",
  ],
  i18n: {
    locales: [
      { code: "ru", name: "RU", file: "ru.json" },
      { code: "en", name: "EN", file: "en.json" },
    ],
    langDir: "locales",
    defaultLocale: "ru",
    fallbackLocale: "ru",
    strategy: "prefix_except_default",
    lazy: true,
    detectBrowserLanguage: false,
  },
  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      extensions: [".vue"],
      ignore: ["**/*.js", "**/*.ts", "**/vite/**", "**/node_modules/**"],
    },
  ],
  vite: {
    plugins: [svgLoader({ svgo: false })],
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "~/assets/styles/tools" as *;
            @use "~/assets/styles/variables" as *;
          `,
        },
      },
    },
  },
  app: {
    head: {
      title: "Personal Portfolio",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "description",
          content: "Персональный сайт-портфолио веб-разработчика",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteName: "Personal Portfolio",
    },
  },
  eslint: {
    config: {
      rules: {
        "vue/no-v-html": "off",
        "vue/no-multiple-template-root": "off",
        "vue/require-default-prop": "off",
        "vue/multi-word-component-names": "warn",
        "vue/attribute-hyphenation": ["warn", "always"],
        "vue/prop-name-casing": ["warn", "camelCase"],
        "vue/v-on-event-hyphenation": "warn",
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-nocheck": "allow-with-description",
            "ts-ignore": "allow-with-description",
          },
        ],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      },
    },
    checker: {
      lintOnStart: false,
      formatter: "stylish",
    },
    fix: process.env.NODE_ENV === "development",
    cache: true,
  },
});
