# Aidan's Blog

Personal blog deployed on GitHub Pages at https://aidankaokao.github.io/blog/

## Tech Stack

- **Astro v5** (static site generator, Content Layer API)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (not `@astrojs/tailwind`)
- **TypeScript**
- Deployed via **GitHub Actions** (`.github/workflows/deploy.yml`)

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (output: `dist/`)
- `npm run preview` — preview production build locally

## Project Structure

```
articles/              # Markdown articles (date-prefixed folders)
  2024-01-03-slug/
    index.md           # Article content
    image.jpg          # Co-located images (use `./image.jpg` in md)
public/                # Static assets (avatar.jpg, favicon.svg)
src/
  components/          # Astro components
  data/                # JSON data (profile, skills, works)
  layouts/             # BaseLayout, ArticleLayout
  pages/               # Routes: index, works, about, articles/[...slug]
  styles/              # global.css, seasons.css (theme variables)
  content.config.ts    # Content collection schema
astro.config.mjs       # Site config (base: "/blog")
```

## Key Architecture

### Theming
- Light/dark mode via `data-theme` attribute on `<html>`
- Theme variables defined in `src/styles/seasons.css` using `--season-*` CSS custom properties
- `ThemeProvider.astro` sets theme before paint (inline script in `<head>`)
- `ThemeToggle.astro` uses `.theme-toggle-btn` class (not ID) since it renders in both desktop and mobile nav

### Glassmorphism Style
- `GlassCard.astro` is the core card component: `backdrop-filter: blur(24px)`, semi-transparent bg, inner highlight, diffused shadow
- Body uses pastel gradient background with `background-attachment: fixed`

### Articles
- Stored in `articles/` with date-prefixed folder names: `YYYY-MM-DD-slug/index.md`
- Date prefix is stripped for URL slugs: `/blog/articles/slug/`
- Images co-located in article folders, referenced as `./filename.jpg` in markdown
- External links in articles auto-open in new tab (script in `ArticleLayout.astro`)
- Content collection defined in `src/content.config.ts` using `glob({ pattern: '**/index.md', base: './articles' })`

### Pages
- **Articles** (`/`) — home page, article grid with tag filter
- **Works** (`/works/`) — portfolio from `src/data/works.json`
- **About** (`/about/`) — profile card, skill bars (animated), contact section

### Navigation
- Header: Articles | Works | About + social icon links + theme toggle
- Astro View Transitions for page navigation
- Scroll-triggered animations via IntersectionObserver (`[data-animate]` attribute)

## Data Files

- `src/data/profile.json` — name, bio, avatar path, social links, site name
- `src/data/skills.json` — skill categories with color and items (name + level %)
- `src/data/works.json` — portfolio entries (title, description, url, tags)

## Important Notes

- `astro.config.mjs` `base` must match the GitHub repo name (`/blog`)
- BASE_URL trailing slash is inconsistent in Astro; always normalize with `.replace(/\/$/, '')` before concatenating paths
- `getStaticPaths()` is hoisted in Astro — functions defined outside it are not accessible; inline logic directly
- The `--season-*` variable prefix is a legacy name from the original seasonal theme; it now powers light/dark mode
