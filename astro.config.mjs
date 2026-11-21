import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` (and `base` if deploying to GitHub Pages under /doing-economics)
export default defineConfig({
  site: 'https://osicool.github.io',
  base: '/doing-economics',
  integrations: [sitemap()],
  // Pages are tiny (~7-20 KB), so fetch every linked page as soon as its link scrolls into view.
  // Clicks then swap in an already-downloaded page, which feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
