import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default withNuxt([
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "vue/no-v-html": "off",
      "vue/html-self-closing": [
        "warn",
        {
          html: {
            void: "never",
          },
        },
      ],
      "prettier/prettier": "error",
    },
    files: ["**/*.{js,ts}"],
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/no-v-html": "off",
      "vue/html-self-closing": [
        "warn",
        {
          html: {
            void: "never",
          },
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-nocheck": "allow-with-description",
          "ts-ignore": "allow-with-description",
        },
      ],
    },
  },
  prettierConfig,
]);

