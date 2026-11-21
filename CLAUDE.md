# Doing Economics: project guide for Claude

Static [Astro](https://astro.build) site of hands-on empirical economics projects. The project list mirrors
CORE Econ's *Doing Economics: Empirical projects* (Tipoe & Becker): 12 projects plus "Extra 1" and "Extra 2".
Deployed to GitHub Pages at `https://osicool.github.io/doing-economics/`.

## Commands

Node.js is required (installed via winget; in Git Bash add `/c/Program Files/nodejs` to PATH if `npm` is not found).

- `npm run dev`: dev server at **http://localhost:4321/doing-economics/** (the base path is required; `/` is a 404).
  The `astro-dev` entry in `.claude/launch.json` starts this from the Claude app.
- `npm run build`: static output in `dist/`. Run before pushing.
- `npm run check`: type-check `.astro`/`.ts` files (`@astrojs/check`). Should report 0 errors.

## Structure

```
astro.config.mjs        site + base ('/doing-economics') + sitemap
src/content.config.ts   zod schema for the `projects` collection
src/content/projects/   one Markdown file per project (NN-slug.md)
src/lib/projects.ts     getProjects() (non-draft, sorted by order) and `base` (BASE_URL without trailing slash)
src/layouts/Base.astro  <html> shell: head/meta, Header, <main class="wrap">, Footer
src/components/         Header, Footer, ProjectCard
src/pages/              index (home: hero + all projects with topic filter), about, 404, projects/[...id] (project page)
src/styles/global.css   design tokens (CSS variables) and shared classes
public/favicon.svg
.github/workflows/deploy.yml   builds and deploys to GitHub Pages on push to main
```

## Conventions

- **Base path:** never hard-code `/doing-economics`. Import `base` from `src/lib/projects.ts` and write
  `` `${base}/about/` ``. Internal links need the trailing slash. Project pages live at `${base}/projects/<id>/`;
  there is no `/projects/` index page (the home page lists every project).
- **Fetching projects:** always use `getProjects()`, never `getCollection` directly, so drafts and ordering stay consistent.
- **Project front matter** (validated in `content.config.ts`): `title`, `summary`, `order` (number), `topic` (string),
  optional `level` (`Introductory | Intermediate | Advanced`), `tools` (string[]), `dataset`, `draft`.
  Topics become the filter buttons on the home page automatically. The body's `##` headings become the
  "On this page" list. To add a project, add a file; no other edits needed.
- **Colours:** use the CSS variables in `global.css` (`--accent` green, `--purple` / `--purple-text` hover highlight,
  `--card`, `--line`, `--muted`). Dark mode is automatic via `prefers-color-scheme`; both palettes live in `global.css`.
- **Styling:** scoped `<style>` blocks per component, shared things in `global.css`. No CSS framework, no client-side
  framework; the only JS is the small topic-filter `<script>` in `index.astro`.
- **Navigation speed:** `<ClientRouter />` (in `Base.astro`) swaps pages without a full reload, and `prefetch` in
  `astro.config.mjs` fetches every linked page as it scrolls into view. Because the router doesn't re-run module
  scripts, any page script must attach its listeners inside `document.addEventListener('astro:page-load', ...)`
  (see the topic filter in `index.astro`).
- **Hover highlight:** purple lift/shadow on project cards, tags and filter buttons. Hover rules sit inside
  `@media (hover: hover)` (so touch screens don't stick) and are mirrored for keyboard focus. The card highlight is
  triggered from the stationary `.slot` wrapper, *not* the card, because the card moves on hover and triggering from
  it caused flicker. Keep tag backgrounds opaque (`color-mix(... var(--card))`), not transparent, to avoid flashes mid-fade.
- **Grid sizing:** `.grid` uses `grid-auto-rows: 1fr` and cards are `height: 100%` so every card is the same size.

## Content notes

- Project pages are currently short: a link to the CORE project and its list of parts. They do **not** reproduce CORE's
  text or data. The footer credits CORE and the authors.
- **Before publishing, check CORE's licence/terms** for Doing Economics and make sure the attribution meets them.
- The home page shows all projects; the nav only has "About".
- `.nojekyll` (repo root and `public/`) stops GitHub Pages running Jekyll; added via a Copilot PR. Keep it.

## Gotchas

- Windows checkout: files may have CRLF line endings. When scripting edits, normalise or use the Edit tool.
- `.claude/settings.local.json` is git-ignored; `.claude/launch.json` is committed.
