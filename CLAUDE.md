# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog and website for itsronald.com, built with Astro (static site generator). Originally created in May 2016 on Hugo; migrated to Astro in February 2026. The visual theme is ported from hugo-future-imperfect, using the theme's pre-minified CSS/JS blobs.

## Build & Development Commands

```bash
# Install dependencies
yarn install

# Local development server (localhost:4321, auto-reloads on changes)
yarn dev

# Production build to dist/
yarn build

# Preview production build locally
yarn preview
```

Requires Node.js 20+ and Yarn 4 (Berry). Yarn is managed via corepack (`corepack enable`).

## Branch & Deployment Model

- **`main`** — Source branch. All development happens here. GitHub Actions builds and deploys to GitHub Pages.
- **`hugo-site`** — Archived. Contains the original Hugo source from 2016–2018, preserved for historical reference.
- **`master`** — Deprecated. Previously contained generated static files for GitHub Pages. Will be deleted after Astro migration is fully deployed.
- **`public/CNAME`** — Maps the custom domain `itsronald.com`. Required for GitHub Pages custom domains.

## Project Structure

```
src/
├── components/       # Astro components (ported from Hugo partials)
├── content/
│   └── blog/         # Blog posts (Astro content collection, YAML frontmatter)
│   └── config.ts     # Zod schema for blog frontmatter
├── data/
│   └── site.ts       # Typed site config (replaces Hugo's config.toml)
├── layouts/          # Page layouts (BaseLayout, PageWithSidebar, PostLayout, SinglePage)
├── pages/            # File-based routing
└── utils/            # Helpers (readingTime, excerpt, postUrl, featuredImage)
public/               # Static assets (CSS, JS, fonts, images, favicons)
```

## Theme & Styling

The visual theme is ported from hugo-future-imperfect (by jpescador). The theme's CSS and JS are pre-minified blobs with no source files:

- **`public/css/main.min.css`** — Bundled CSS (Font Awesome 4.5, Source Sans Pro/Raleway fonts, highlight.js theme, skel.js layout, all component styles)
- **`public/js/main.min.js`** — Bundled JS (jQuery, skel.js, highlight.js, back-to-top, etc.)
- **`public/fonts/`** — Font files referenced by the CSS

**Critical DOM structure**: The theme's JS (skel.js/jQuery) manipulates the DOM by element ID. These IDs must be preserved: `#wrapper`, `#main`, `#sidebar`, `#header`, `#intro`, `#menu`, `#share-menu`, `#back-to-top`.

Astro's markdown syntax highlighting is disabled (`markdown.syntaxHighlight: false`) because the theme's bundled highlight.js handles it via `hljs.initHighlightingOnLoad()`.

## Content Conventions

Blog post frontmatter (YAML `---` delimiters):
- `author`, `date`, `title`, `description`, `type` (always "post")
- `categories` — array of tags
- `featured` — filename of featured image
- `featuredpath` — set to `"date"` so images resolve from `/img/YYYY/MM/`
- `featuredalt` — alt text for featured image

Blog posts live under `src/content/blog/YYYY/MM/post-slug.md`. Featured images go in the matching `public/img/YYYY/MM/` directory.

## Adding a New Blog Post

1. Create `src/content/blog/YYYY/MM/post-slug.md` with YAML frontmatter
2. Place featured image (if any) in `public/img/YYYY/MM/`
3. Use standard Markdown and inline HTML — no shortcodes
4. The post URL will be `/blog/YYYY/MM/post-slug/`
