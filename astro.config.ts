import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://itsronald.com",
  output: "static",
  build: {
    format: "directory",
  },
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [sitemap()],
});
