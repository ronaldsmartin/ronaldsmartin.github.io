import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist/", "public/", ".astro/", ".yarn/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        astroHTML: "readonly",
      },
    },
  },
  prettier,
];
