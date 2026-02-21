# itsronald.com

Source for my personal blog, built with [Astro](https://astro.build/).

### Run locally

```bash
corepack enable
yarn install
yarn dev
```

The site will run on `localhost:4321`, rebuilding automatically on source changes.

### Build

```bash
yarn build     # Production build to dist/
yarn preview   # Preview the production build locally
```

### Deploy

Deployment to GitHub Pages is handled by GitHub Actions on push to `main`.

## History

This site was originally built with [Hugo](https://gohugo.io/) in 2016 using the [hugo-future-imperfect](https://github.com/jpescador/hugo-future-imperfect) theme. The original Hugo source is preserved on the [`hugo-site`](https://github.com/ronaldsmartin/ronaldsmartin.github.io/tree/hugo-site) branch for historical reference.

## Credits

- [Astro](https://astro.build/) static site generator
- Visual theme ported from [hugo-future-imperfect](https://github.com/jpescador/hugo-future-imperfect) by jpescador, based on [Future Imperfect](https://html5up.net/future-imperfect) by HTML5 UP
