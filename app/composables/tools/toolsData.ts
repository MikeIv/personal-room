export const toolsData = () => {
  const toolsDescription = ref([
    {
      id: "js",
      icon: "custom:js",
      name: "Js",
      plugIn: [],
      links: [{ text: "Шпаргалки JS&TS", href: "https://my-js.org/" }],
    },
    {
      id: "vue",
      icon: "custom:vue",
      name: "Vue",
      plugIn: [],
      links: [
        { text: "На Хабре", href: "https://habr.com/ru/hub/vuejs/" },
        {
          text: "Composition API",
          href: "https://tproger.ru/articles/kak-sozdat-prilozhenie-vokrug-composition-api-vo-vue-3/",
        },
        {
          text: "Хуки Composition API",
          href: "https://v3.ru.vuejs.org/ru/api/composition-api.html#хуки-жизненного-цикла",
        },
        {
          text: "VueUse",
          href: "https://vueuse.org/functions.html",
        },
      ],
    },
    {
      id: "nuxt",
      icon: "custom:nuxt",
      name: "Nuxt",
      plugIn: [],
      links: [
        { text: "Fake API", href: "https://fakestoreapi.com/" },
        {
          text: "Настройка ESLint and Prettier",
          href: "https://dev.to/tao/series/21187",
        },
        {
          text: "Commitizen and husky",
          href: "https://rdevelab.ru/blog/no-category/post/git-commits-lint-with-commitlint-and-husky",
        },
      ],
      npm: [
        { text: "prettier", href: "https://www.npmjs.com/package/prettier" },
        {
          text: "autoprefixer",
          href: "https://www.npmjs.com/package/autoprefixer",
        },
        { text: "postcss", href: "https://www.npmjs.com/package/postcss" },
        {
          text: "sass-loader",
          href: "https://www.npmjs.com/package/sass-loader",
        },
        {
          text: "@vueuse/nuxt",
          href: "https://www.npmjs.com/package/@vueuse/nuxt",
        },
      ],
      modules: [
        { text: "@nuxt/content", href: "https://nuxt.com/modules/content" },
        { text: "@nuxtjs/i18n", href: "https://nuxt.com/modules/i18n" },
        { text: "@pinia/nuxt", href: "https://nuxt.com/modules/pinia" },
        {
          text: "@nuxtjs/tailwindcss",
          href: "https://nuxt.com/modules/tailwindcss",
        },
        { text: "nuxt-icons", href: "https://nuxt.com/modules/icons" },
      ],
    },
    {
      id: "html",
      icon: "custom:html",
      name: "Html",
      plugIn: [],
      links: [
        {
          text: "Структура HTML-документа",
          href: "https://habr.com/ru/company/macloud/blog/555082/",
        },
        {
          text: "Теги и атрибуты",
          href: "https://habr.com/ru/company/macloud/blog/555400/",
        },
        { text: "Email framework", href: "https://get.foundation/index.html" },
        { text: "Fonts to woff2", href: "https://transfonter.org/" },
      ],
    },
    {
      id: "css",
      icon: "custom:css",
      name: "Css",
      plugIn: [],
      links: [
        { text: "На Хабре", href: "https://habr.com/ru/hub/css/" },
        { text: "Справочник HTML и CSS", href: "https://hcdev.ru/" },
        {
          text: "Руководство по Grid",
          href: "https://tuhub.ru/posts/css-grid-complete-guide",
        },
        {
          text: "Трюки CSS",
          href: "https://habr.com/ru/company/macloud/blog/557796/",
        },
        { text: "SVG иконки", href: "https://icones.js.org/" },
        {
          text: "Оптимизация изображений",
          href: "https://tinyjpg.com/",
        },
        { text: "CSS Анимации", href: "https://animista.net/" },
        {
          text: "CSS Генераторы",
          href: "https://techrocks.ru/2022/09/02/css-code-generators",
        },
      ],
    },
  ]);

  return {
    toolsDescription,
  };
};
