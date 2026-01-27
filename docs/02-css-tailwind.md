# CSS & Tailwind Guide

## How Styling Works in This Project

This project uses **Tailwind CSS** - a utility-first CSS framework. Instead of writing custom CSS, you compose styles using pre-built utility classes.

## The Two Ways to Style

### 1. Tailwind Utility Classes (Preferred)

Apply styles directly in HTML:

```html
<!-- Traditional CSS approach -->
<div class="my-card">Hello</div>
<style>
  .my-card {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
</style>

<!-- Tailwind approach (same result) -->
<div class="bg-white p-4 rounded-lg shadow">Hello</div>
```

### 2. Custom Component Classes (for reusability)

Defined in `src/styles/global.css` using `@apply`:

```css
/* In global.css */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3
           font-medium rounded-lg transition-all duration-200;
  }
}
```

```html
<!-- Usage -->
<button class="btn btn-primary">Click me</button>
```

## Project Color Palette

### Color Definitions

Colors are defined in **two places** (keep them in sync!):

**1. Tailwind Config** (`tailwind.config.mjs`) - for Tailwind classes:
```js
colors: {
  primary: '#6adcad',
  secondary: '#2c2626',
  tertiary: '#1446a0',
  background: '#05232C',
  foreground: '#F2F6F6',
}
```

**2. CSS Variables** (`src/styles/global.css`) - for CSS custom properties:
```css
:root {
  --color-primary: #6adcad;
  --color-secondary: #2c2626;
  --color-tertiary: #1446a0;
  --color-background: #001514;
  --color-foreground: #F2F6F6;
}
```

### Color Reference

| Name         | Hex       | Preview | Usage                          |
|--------------|-----------|---------|--------------------------------|
| `primary`    | `#6adcad` | 🟢      | Buttons, links, accents (teal/mint) |
| `secondary`  | `#2c2626` | 🟤      | Card backgrounds, subtle elements |
| `tertiary`   | `#1446a0` | 🔵      | Alternative accent (blue)      |
| `background` | `#05232C` | ⬛      | Page background (dark teal)    |
| `foreground` | `#F2F6F6` | ⬜      | Light text on dark backgrounds |

### Using Colors with Tailwind

```html
<!-- Text color -->
<p class="text-primary">Teal text</p>
<p class="text-foreground">Light text</p>
<p class="text-foreground/70">70% opacity light text</p>

<!-- Background color -->
<div class="bg-background">Dark background</div>
<div class="bg-secondary">Card background</div>
<div class="bg-primary/20">20% teal tint</div>

<!-- Border color -->
<div class="border border-primary">Teal border</div>
<div class="border border-foreground/10">Subtle border</div>

<!-- Gradients -->
<div class="bg-gradient-to-r from-primary to-tertiary">Gradient</div>
```

### Opacity Modifiers

Add `/{value}` to any color for transparency:

```html
<div class="bg-primary/10">10% opacity</div>
<div class="bg-primary/20">20% opacity</div>
<div class="bg-primary/30">30% opacity</div>
<div class="bg-primary/50">50% opacity</div>
<div class="bg-primary/70">70% opacity</div>
<div class="bg-primary/90">90% opacity</div>
<div class="text-foreground/70">70% text opacity</div>
```

### Using CSS Variables

For custom CSS or inline styles:

```css
.my-element {
  color: var(--color-primary);
  background: var(--color-background);
  border: 1px solid var(--color-foreground);
}
```

### Changing Colors

To update the color palette:

1. **Edit `tailwind.config.mjs`** - change the hex values in `theme.extend.colors`
2. **Edit `src/styles/global.css`** - change the CSS variables in `:root`
3. **Keep both in sync!**

Example - changing primary to a different green:
```js
// tailwind.config.mjs
colors: {
  primary: '#22c55e',  // Changed from #6adcad
  // ...
}
```
```css
/* global.css */
:root {
  --color-primary: #22c55e;  /* Changed from #6adcad */
}
```

## Essential Tailwind Classes

### Spacing (padding & margin)

```
p-{n}  = padding all sides     m-{n}  = margin all sides
px-{n} = padding left/right    mx-{n} = margin left/right
py-{n} = padding top/bottom    my-{n} = margin top/bottom
pt-{n} = padding top           mt-{n} = margin top
pb-{n} = padding bottom        mb-{n} = margin bottom
pl-{n} = padding left          ml-{n} = margin left
pr-{n} = padding right         mr-{n} = margin right

Values: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32...
1 = 0.25rem = 4px
4 = 1rem = 16px
8 = 2rem = 32px
```

Examples:
```html
<div class="p-4">           <!-- padding: 16px all sides -->
<div class="px-6 py-4">     <!-- padding: 16px top/bottom, 24px left/right -->
<div class="mt-8 mb-4">     <!-- margin-top: 32px, margin-bottom: 16px -->
<div class="mx-auto">       <!-- margin: 0 auto (center horizontally) -->
```

### Typography

```html
<!-- Font size -->
<p class="text-sm">Small text (14px)</p>
<p class="text-base">Base text (16px)</p>
<p class="text-lg">Large text (18px)</p>
<p class="text-xl">Extra large (20px)</p>
<p class="text-2xl">2XL (24px)</p>
<p class="text-3xl">3XL (30px)</p>
<p class="text-4xl">4XL (36px)</p>

<!-- Font weight -->
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>

<!-- Text color -->
<p class="text-primary">Teal text</p>
<p class="text-foreground">Light text</p>
<p class="text-gray-400">Gray text</p>
<p class="text-white">White text</p>

<!-- Text alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Centered</p>
<p class="text-right">Right aligned</p>

<!-- Line height -->
<p class="leading-tight">Tight (1.25)</p>
<p class="leading-normal">Normal (1.5)</p>
<p class="leading-relaxed">Relaxed (1.625)</p>
```

### Flexbox

```html
<!-- Basic flex container -->
<div class="flex">...</div>

<!-- Direction -->
<div class="flex flex-row">...</div>      <!-- Horizontal (default) -->
<div class="flex flex-col">...</div>      <!-- Vertical -->

<!-- Justify (main axis) -->
<div class="flex justify-start">...</div>     <!-- Items at start -->
<div class="flex justify-center">...</div>    <!-- Items centered -->
<div class="flex justify-end">...</div>       <!-- Items at end -->
<div class="flex justify-between">...</div>   <!-- Space between -->
<div class="flex justify-around">...</div>    <!-- Space around -->

<!-- Align (cross axis) -->
<div class="flex items-start">...</div>       <!-- Top aligned -->
<div class="flex items-center">...</div>      <!-- Vertically centered -->
<div class="flex items-end">...</div>         <!-- Bottom aligned -->
<div class="flex items-stretch">...</div>     <!-- Stretch to fill -->

<!-- Gap between items -->
<div class="flex gap-4">...</div>             <!-- 16px gap -->
<div class="flex gap-x-4 gap-y-2">...</div>   <!-- Different x/y gaps -->

<!-- Wrap -->
<div class="flex flex-wrap">...</div>         <!-- Allow wrapping -->

<!-- Common pattern: centered content -->
<div class="flex items-center justify-center min-h-screen">
  <p>Perfectly centered!</p>
</div>
```

### Grid

```html
<!-- Basic grid -->
<div class="grid grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

<!-- Responsive grid (1 col mobile, 2 tablet, 3 desktop) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  ...
</div>

<!-- Auto-fit grid -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  ...
</div>
```

### Width & Height

```html
<!-- Fixed width -->
<div class="w-32">128px wide</div>
<div class="w-64">256px wide</div>
<div class="w-full">100% width</div>
<div class="w-screen">100vw</div>
<div class="w-1/2">50% width</div>
<div class="w-1/3">33.33% width</div>

<!-- Max width -->
<div class="max-w-md">max 448px</div>
<div class="max-w-2xl">max 672px</div>
<div class="max-w-7xl">max 1280px</div>

<!-- Height -->
<div class="h-16">64px tall</div>
<div class="h-screen">100vh</div>
<div class="min-h-screen">at least 100vh</div>
```

### Backgrounds & Borders

```html
<!-- Background color -->
<div class="bg-primary">Teal background</div>
<div class="bg-background">Dark background</div>
<div class="bg-white">White background</div>
<div class="bg-gray-900">Dark gray</div>

<!-- Background opacity -->
<div class="bg-primary/50">50% opacity</div>
<div class="bg-black/75">75% black overlay</div>

<!-- Borders -->
<div class="border">1px border</div>
<div class="border-2">2px border</div>
<div class="border-primary">Teal border</div>
<div class="border-t">Top border only</div>

<!-- Border radius -->
<div class="rounded">Small radius (4px)</div>
<div class="rounded-lg">Large radius (8px)</div>
<div class="rounded-xl">Extra large (12px)</div>
<div class="rounded-full">Fully rounded (pill/circle)</div>
```

### Shadows

```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large</div>
```

### Transitions & Hover

```html
<!-- Basic transition -->
<button class="transition-all duration-200 hover:bg-primary">
  Hover me
</button>

<!-- Transform on hover -->
<div class="transition-transform hover:scale-105">
  Grows on hover
</div>

<!-- Color transition -->
<a class="text-gray-400 hover:text-primary transition-colors">
  Link
</a>

<!-- Multiple hover effects -->
<div class="bg-white hover:bg-gray-50 hover:shadow-lg transition-all">
  Card
</div>
```

## Responsive Design

Tailwind uses **mobile-first** breakpoints. Styles apply to that breakpoint AND larger:

| Prefix | Min-width | Typical device |
|--------|-----------|----------------|
| (none) | 0px       | Mobile         |
| `sm:`  | 640px     | Large phone    |
| `md:`  | 768px     | Tablet         |
| `lg:`  | 1024px    | Laptop         |
| `xl:`  | 1280px    | Desktop        |
| `2xl:` | 1536px    | Large desktop  |

```html
<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  ...
</div>

<!-- Mobile: stacked, Desktop: side by side -->
<div class="flex flex-col lg:flex-row gap-4">
  <div class="w-full lg:w-1/2">Left</div>
  <div class="w-full lg:w-1/2">Right</div>
</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden lg:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="lg:hidden">Mobile only</div>

<!-- Different padding at breakpoints -->
<div class="p-4 md:p-8 lg:p-16">
  More padding on larger screens
</div>
```

## Custom Component Classes

These are defined in `src/styles/global.css` for frequently-used patterns:

### Buttons

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-tertiary">Tertiary Button</button>

<!-- With size modifiers (if defined) -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Layout

```html
<!-- Standard section with vertical padding -->
<section class="section">
  <!-- Centered container with max-width -->
  <div class="container-custom">
    Content here
  </div>
</section>
```

### Cards

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<!-- With hover effect -->
<div class="card hover-lift">
  Lifts on hover
</div>
```

### Forms

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" />
</div>
```

### Text Effects

```html
<!-- Gradient text effect -->
<h1 class="gradient-text">Shiny Heading</h1>
```

## The global.css Structure

```css
/* 1. Tailwind imports */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. CSS Variables (colors, fonts) */
:root {
  --color-primary: #6adcad;
  --color-secondary: #2c2626;
  /* ... */
}

/* 3. Base layer (element defaults) */
@layer base {
  body {
    @apply bg-background text-foreground font-sans;
  }

  h1 {
    @apply text-4xl md:text-5xl font-bold;
  }
  /* ... */
}

/* 4. Component layer (reusable patterns) */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center ...;
  }

  .btn-primary {
    @apply bg-primary text-secondary hover:bg-primary/90;
  }

  .card {
    @apply bg-secondary/50 rounded-xl p-6;
  }
  /* ... */
}

/* 5. Utility layer (custom utilities) */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  /* ... */
}
```

## Practical Examples

### Hero Section

```html
<section class="relative min-h-screen flex items-center bg-background">
  <div class="container-custom py-20">
    <div class="max-w-3xl">
      <h1 class="text-4xl md:text-6xl font-bold text-foreground mb-6">
        Welcome to <span class="text-primary">VICUS</span>
      </h1>
      <p class="text-lg text-gray-400 mb-8">
        Building simulation made simple.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="/demo" class="btn btn-primary">Get Demo</a>
        <a href="/features" class="btn btn-secondary">Learn More</a>
      </div>
    </div>
  </div>
</section>
```

### Feature Card Grid

```html
<section class="section bg-secondary">
  <div class="container-custom">
    <h2 class="text-3xl font-bold text-center mb-12">Features</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <div class="card hover-lift">
        <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-primary">...</svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Feature Title</h3>
        <p class="text-gray-400">Feature description goes here.</p>
      </div>

      <!-- More cards... -->
    </div>
  </div>
</section>
```

### Responsive Navigation

```html
<nav class="fixed top-0 w-full bg-background/95 backdrop-blur z-50">
  <div class="container-custom flex items-center justify-between h-16">
    <!-- Logo -->
    <a href="/" class="flex items-center">
      <img src="/logo.svg" alt="Logo" class="h-8" />
    </a>

    <!-- Desktop menu (hidden on mobile) -->
    <div class="hidden md:flex items-center gap-6">
      <a href="/features" class="text-gray-400 hover:text-primary transition-colors">
        Features
      </a>
      <a href="/pricing" class="text-gray-400 hover:text-primary transition-colors">
        Pricing
      </a>
      <a href="/contact" class="btn btn-primary">
        Contact
      </a>
    </div>

    <!-- Mobile menu button (hidden on desktop) -->
    <button class="md:hidden p-2">
      <svg class="w-6 h-6 text-foreground">...</svg>
    </button>
  </div>
</nav>
```

## Tips & Best Practices

### 1. Use the Design System

Stick to the defined colors (`primary`, `secondary`, etc.) rather than arbitrary values.

```html
<!-- Good -->
<div class="bg-primary text-secondary">...</div>

<!-- Avoid (breaks consistency) -->
<div class="bg-[#ff5733] text-[#123456]">...</div>
```

### 2. Extract Repeated Patterns

If you use the same combination 3+ times, add it to `global.css`:

```css
@layer components {
  .feature-icon {
    @apply w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center;
  }
}
```

### 3. Mobile-First Thinking

Start with mobile styles, then add responsive modifiers:

```html
<!-- Start with mobile layout, add desktop variations -->
<div class="flex flex-col lg:flex-row">
  ...
</div>
```

### 4. Use class:list for Conditional Classes

In Astro, use `class:list` for dynamic classes:

```astro
---
const { isActive, variant } = Astro.props;
---

<div class:list={[
  'btn',
  `btn-${variant}`,
  { 'btn-active': isActive }
]}>
  ...
</div>
```

## Next Steps

- [Components](./03-components.md) - See how components use these styles
- [Quick Reference](./05-quick-reference.md) - Cheat sheet for common patterns
