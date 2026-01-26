# VICUS Website Documentation

This documentation explains how the VICUS website is built using Astro and Tailwind CSS.

## Table of Contents

1. [Astro Basics](./01-astro-basics.md) - How Astro works and project structure
2. [CSS & Tailwind](./02-css-tailwind.md) - Styling system and custom utilities
3. [Components](./03-components.md) - Component patterns and best practices
4. [Internationalization](./04-i18n.md) - Multi-language support (DE/EN)
5. [Quick Reference](./05-quick-reference.md) - Cheat sheet for common tasks

## Project Overview

This is a **static website** built with:

- **Astro 5.x** - The web framework
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **TypeScript** - Type safety
- **MDX** - Markdown with components for blog posts

## Key Directories

```
src/
├── components/     # Reusable UI pieces
├── layouts/        # Page templates (BaseLayout, PageLayout)
├── pages/          # Routes (file = URL)
│   ├── de/         # German pages
│   └── en/         # English pages
├── styles/         # Global CSS (Tailwind config)
├── i18n/           # Translations
└── content/        # Blog posts (MDX)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Quick Tips

- **Creating a new page**: Add `.astro` file in `src/pages/de/` AND `src/pages/en/`
- **Styling**: Use Tailwind classes directly in HTML, or custom classes from `global.css`
- **Translations**: Add strings to `src/i18n/ui.ts`, use `t('key')` in components
- **Images**: Place in `public/images/`, reference as `/images/filename.png`
