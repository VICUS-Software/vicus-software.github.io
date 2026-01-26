# Astro Basics

## What is Astro?

Astro is a **static site generator** that builds fast websites by shipping **zero JavaScript** by default. It uses a component-based architecture similar to React or Vue, but renders everything to HTML at build time.

## The .astro File Format

Every `.astro` file has two parts separated by `---`:

```astro
---
// 1. FRONTMATTER (runs at build time, on the server)
// This is JavaScript/TypeScript that runs ONCE when building the page

import SomeComponent from '../components/SomeComponent.astro';

const title = "My Page";
const items = ['apple', 'banana', 'cherry'];
---

<!-- 2. TEMPLATE (the HTML output) -->
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>

    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>

    <SomeComponent />
  </body>
</html>

<style>
  /* 3. SCOPED STYLES (optional) - only apply to THIS component */
  h1 { color: blue; }
</style>

<script>
  // 4. CLIENT-SIDE SCRIPT (optional) - runs in the browser
  console.log('Hello from the browser!');
</script>
```

## Key Concepts

### 1. Frontmatter (The `---` Block)

The code between `---` runs **at build time**, not in the browser. Use it to:

- Import components
- Fetch data
- Define variables
- Access props

```astro
---
// Imports
import Header from '../components/Header.astro';
import { getLangFromUrl, useTranslations } from '../i18n/utils';

// Get current language from URL
const lang = getLangFromUrl(Astro.url);

// Get translation function
const t = useTranslations(lang);

// Define variables
const currentYear = new Date().getFullYear();
---
```

### 2. Props (Passing Data to Components)

Components receive data via `Astro.props`:

```astro
---
// Button.astro
interface Props {
  label: string;
  variant?: 'primary' | 'secondary';
  href?: string;
}

const { label, variant = 'primary', href } = Astro.props;
---

<a href={href} class={`btn btn-${variant}`}>
  {label}
</a>
```

Usage:
```astro
<Button label="Click me" variant="secondary" href="/contact" />
```

### 3. Template Expressions

Use `{expression}` to insert JavaScript values:

```astro
---
const name = "World";
const isLoggedIn = true;
const fruits = ['Apple', 'Banana'];
---

<!-- Simple value -->
<h1>Hello, {name}!</h1>

<!-- Conditional rendering -->
{isLoggedIn && <p>Welcome back!</p>}

{isLoggedIn ? <LogoutButton /> : <LoginButton />}

<!-- Loops -->
<ul>
  {fruits.map(fruit => <li>{fruit}</li>)}
</ul>

<!-- Dynamic attributes -->
<div class={isLoggedIn ? 'logged-in' : 'guest'}>
  ...
</div>
```

### 4. Slots (Passing Children)

Slots let you pass content INTO a component:

```astro
<!-- Card.astro -->
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<div class="card">
  <h2>{title}</h2>
  <slot />  <!-- Children appear here -->
</div>
```

Usage:
```astro
<Card title="My Card">
  <p>This paragraph goes into the slot!</p>
  <p>So does this one.</p>
</Card>
```

Named slots for multiple insertion points:
```astro
<!-- Layout.astro -->
<header>
  <slot name="header" />
</header>
<main>
  <slot />  <!-- Default slot -->
</main>
<footer>
  <slot name="footer" />
</footer>

<!-- Usage -->
<Layout>
  <h1 slot="header">Page Title</h1>
  <p>Main content goes here</p>
  <p slot="footer">Copyright 2024</p>
</Layout>
```

## File-Based Routing

Every file in `src/pages/` becomes a URL:

```
src/pages/index.astro        → /
src/pages/about.astro        → /about
src/pages/blog/post-1.astro  → /blog/post-1
src/pages/de/index.astro     → /de/
src/pages/en/contact.astro   → /en/contact
```

### Dynamic Routes

Use `[param]` for dynamic segments:

```
src/pages/blog/[slug].astro  → /blog/any-post-name
```

```astro
---
// [slug].astro
export function getStaticPaths() {
  return [
    { params: { slug: 'post-1' } },
    { params: { slug: 'post-2' } },
  ];
}

const { slug } = Astro.params;
---

<h1>Blog Post: {slug}</h1>
```

## Layouts

Layouts are components that wrap pages. This project uses two main layouts:

### BaseLayout.astro

The root layout with:
- HTML skeleton (`<html>`, `<head>`, `<body>`)
- Header and Footer
- Global styles
- Meta tags
- Analytics

```astro
---
// Any page
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="My Page" description="Page description">
  <h1>Page Content</h1>
</BaseLayout>
```

### PageLayout.astro

Extends BaseLayout with a hero section:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
---

<PageLayout
  title="Features"
  description="Our features"
  heroTitle="Amazing Features"
  heroDescription="Discover what we offer"
>
  <section class="section">
    <!-- Page content -->
  </section>
</PageLayout>
```

## The Astro Global Object

In frontmatter, you have access to `Astro`:

```astro
---
// Current URL
const currentUrl = Astro.url;           // Full URL object
const pathname = Astro.url.pathname;    // e.g., "/en/contact"

// Props passed to this component
const { title } = Astro.props;

// Request info (during SSR)
const headers = Astro.request.headers;

// Redirect (in SSR mode)
return Astro.redirect('/new-page');
---
```

## Styles in Astro

### Scoped Styles

Styles in `<style>` tags are **scoped by default** - they only affect the current component:

```astro
<h1>Hello</h1>

<style>
  /* This ONLY affects the h1 in THIS component */
  h1 {
    color: red;
  }
</style>
```

### Global Styles

For styles that apply everywhere:

```astro
<style is:global>
  /* Affects ALL h1 elements on the page */
  h1 {
    color: red;
  }
</style>
```

Or import a CSS file:

```astro
---
import '../styles/global.css';
---
```

### Using Tailwind

Just add Tailwind classes to your HTML:

```astro
<div class="bg-primary text-white p-4 rounded-lg">
  <h1 class="text-2xl font-bold">Hello</h1>
</div>
```

## Scripts in Astro

### Client-Side Scripts

Scripts run in the browser:

```astro
<button id="my-btn">Click me</button>

<script>
  // This runs in the browser
  document.getElementById('my-btn').addEventListener('click', () => {
    alert('Clicked!');
  });
</script>
```

### Inlined Scripts

By default, Astro bundles scripts. To inline them:

```astro
<script is:inline>
  // This script is inserted as-is, not bundled
</script>
```

### Passing Data to Scripts

You can't directly use frontmatter variables in scripts. Use data attributes:

```astro
---
const userId = 123;
---

<div id="app" data-user-id={userId}></div>

<script>
  const app = document.getElementById('app');
  const userId = app.dataset.userId;
  console.log('User ID:', userId);
</script>
```

## Project Configuration

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Build a static site (default)
  output: 'static',

  // Site URL for sitemap, canonical links
  site: 'https://vicus-software.de',

  // Internationalization
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: true,  // /de/ prefix for German too
    }
  },

  // Plugins
  integrations: [
    tailwind(),
    mdx(),
    sitemap({ i18n: { ... } }),
  ],
});
```

### TypeScript Path Aliases

In `tsconfig.json`, aliases are defined for cleaner imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@i18n/*": ["src/i18n/*"]
    }
  }
}
```

Usage:
```astro
---
import Header from '@components/Header.astro';
import BaseLayout from '@layouts/BaseLayout.astro';
import { useTranslations } from '@i18n/utils';
---
```

## Common Patterns in This Project

### Standard Page Setup

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import { getLangFromUrl, useTranslations, url } from '../../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<PageLayout
  title={t('page.title')}
  description={t('page.description')}
>
  <section class="section container-custom">
    <h2>{t('page.heading')}</h2>
    <p>{t('page.content')}</p>

    <a href={url('/contact', lang)} class="btn btn-primary">
      {t('btn.contact')}
    </a>
  </section>
</PageLayout>
```

### Component with Props and Translations

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

interface Props {
  variant?: 'default' | 'highlighted';
}

const { variant = 'default' } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<div class:list={['card', { 'card-highlighted': variant === 'highlighted' }]}>
  <h3>{t('component.title')}</h3>
  <slot />
</div>
```

## Next Steps

- [CSS & Tailwind](./02-css-tailwind.md) - Learn about the styling system
- [Components](./03-components.md) - Explore component patterns
- [Internationalization](./04-i18n.md) - Understand multi-language support
