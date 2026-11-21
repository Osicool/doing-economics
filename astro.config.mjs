import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` (and `base` if deploying to GitHub Pages under /doing-economics)
export default defineConfig({
  site: 'https://osicool.github.io',
  base: '/doing-economics',
  integrations: [sitemap()],
});
