import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// For GitHub Pages: set SITE_URL and BASE_PATH in environment
// e.g., SITE_URL=https://username.github.io BASE_PATH=/repo-name
const site = process.env.SITE_URL || 'https://vicus-software.com';
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site,
  base,
  output: 'static',
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE',
          en: 'en-US'
        }
      }
    })
  ],
  vite: {
    define: {
      'import.meta.env.PUBLIC_GA_ID': JSON.stringify(process.env.PUBLIC_GA_ID || '')
    }
  }
});
