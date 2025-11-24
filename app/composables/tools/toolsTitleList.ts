export const toolsTitleList = () => {
  type Tools = {
    id: string;
    cell: string;
    icon: string;
    href: string;
    title: string;
  };

  const toolsTitle: Tools[] = [
    {
      id: "js",
      cell: "item-02",
      icon: "custom:js",
      href: "https://learn.javascript.ru/",
      title: "Js Doc",
    },
    {
      id: "vue",
      cell: "item-03",
      icon: "custom:vue",
      href: "https://v3.ru.vuejs.org/",
      title: "Vue.js Doc",
    },
    {
      id: "nuxt",
      cell: "item-04",
      icon: "custom:nuxt",
      href: "https://nuxt.com/",
      title: "Nuxt Doc",
    },
    {
      id: "html",
      cell: "item-05",
      icon: "custom:html",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      title: "HTML Doc",
    },
    {
      id: "css",
      cell: "item-06",
      icon: "custom:css",
      href: "https://developer.mozilla.org/ru/docs/Web/CSS",
      title: "CSS Doc",
    },
  ];

  return {
    toolsTitle,
  };
};

