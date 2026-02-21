# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog and website for itsronald.com, built with Hugo static site generator. Created in May 2016, last content update May 2018. The tooling is from the Hugo ~0.15–0.17 era and predates many modern Hugo features (Hugo Pipes, Hugo Modules, `resources`, etc.).

## Build & Development Commands

```bash
# Local development server (localhost:1313, auto-reloads on changes)
hugo server

# Build site to public/ directory
hugo -d public

# Build and deploy to GitHub Pages (master branch)
./deploy.sh
```

Hugo must be installed (`brew install hugo`). The site was built against Hugo 0.15–0.17; modern Hugo versions may require migration work (e.g. `preserveTaxonomyNames` was deprecated, `.Site.Params` access patterns changed, template function signatures evolved).

## Branch & Deployment Model

- **`hugo-site`** — Source branch. All development happens here.
- **`master`** — Deploy target. Contains only generated static files for GitHub Pages. Never edit directly.
- **`deploy.sh`** — Customized version of X1011's git-directory-deploy. Runs `hugo -d public`, commits the output to `master`, pushes, then removes `public/`. Deploy commit messages are auto-prefixed with `publish:` and include the source commit hash.
- **`static/CNAME`** — Maps the custom domain `itsronald.com`. This file is copied to the build root by Hugo, which is required for GitHub Pages custom domains.
- **`static/LICENSE`** and **`static/README.md`** — Were checked out from the old `master` branch into `static/` so they'd persist in the deployed site root. These are artifacts of the original GitHub Pages setup, not standard Hugo practice.

## Theme & Customizations

**Theme:** hugo-future-imperfect (by jpescador), installed via `git subtree` (not submodule). The theme directory has never been modified after the initial import — all customizations use Hugo's override system or live in `static/`.

**Custom overrides and non-standard patterns:**

- **`layouts/partials/favicon.html`** — Completely rewrites the theme's favicon partial. The theme version uses `apple-touch-icon-precomposed` in a `/favicon/` subdirectory with IE conditional comments. The custom version uses modern favicon markup (apple-touch-icon, manifest.json, safari-pinned-tab, theme-color meta) with files at the site root. Adds `faviconThemeColor` config param not present in the original theme.
- **`static/css/main.min.css`** and **`static/js/main.min.js`** — Copied from the theme's `exampleSite/` directory (identical content). These are the theme's bundled assets (Font Awesome 4.5, jQuery, highlight.js, Source Sans Pro/Raleway fonts) placed in `static/` and loaded via `customCSS`/`customJS` config params. There is no build pipeline or source files for these — they are pre-minified blobs.
- **Raw HTML in Markdown** — `content/projects.md` uses inline `<img>` tags (for width-constrained Google Play badges) rather than standard Markdown image syntax or shortcodes.
- **Hugo 0.17 workaround** — A TOML multiline string with a control character in `config.toml` was replaced with a single-line string due to a parsing bug in Hugo 0.17 (commit `001c9df`).

## Content Conventions

Blog post frontmatter (TOML `+++` delimiters):
- `author`, `date`, `title`, `description`, `type` (always "post")
- `categories` — array of tags
- `featured` — filename of featured image
- `featuredpath` — set to `"date"` so images resolve from `/img/YYYY/MM/`
- `featuredalt` — alt text for featured image

Blog posts live under `content/blog/YYYY/MM/post-slug.md`. Featured images go in the matching `static/img/YYYY/MM/` directory.

## Theme Shortcodes

- `{{< img-post path="date" file="name.jpg" alt="Alt" type="left|center|right" >}}` — single image
- `{{< img-fit ... >}}` — multi-image gallery
- `{{< url-link "text" "url" "target" >}}` — hyperlink with target attribute
