// Astro builds the site from the files in src/ into plain HTML in dist/.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://studiosarhan.com',
  // Lets a preview build live in a sub-folder; the real site uses "/".
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
});
