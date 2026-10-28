// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Served from GitHub Pages at https://shreyamkmr.github.io/shreyam/.
// If you point a custom domain at it, set SITE to that domain and BASE to '/'.
export default defineConfig({
  site: process.env.SITE ?? 'https://shreyamkmr.github.io',
  base: process.env.BASE ?? '/shreyam',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
