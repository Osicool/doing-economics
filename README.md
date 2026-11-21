# Doing Economics

An [Astro](https://astro.build) site of hands-on empirical economics projects.

```bash
npm install
npm run dev      # http://localhost:4321/doing-economics/
npm run build    # static output in dist/
```

## Adding a project

Create `src/content/projects/NN-slug.md`. Front matter is validated by `src/content.config.ts`
(`title`, `summary`, `order`, `topic`, plus optional `level`, `tools`, `dataset`, `draft`).
Pages, topic filters, table of contents and prev/next links are generated automatically.

## Deploying

`.github/workflows/deploy.yml` publishes to GitHub Pages on push to `main`. Edit `site` and `base`
in `astro.config.mjs` if your URL differs (remove `base` for a custom domain).
