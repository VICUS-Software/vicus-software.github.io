# Quick Reference

A cheat sheet for common tasks in the VICUS website.

## File Locations

| What | Where |
|------|-------|
| Pages | `src/pages/de/` and `src/pages/en/` |
| Components | `src/components/` |
| Layouts | `src/layouts/` |
| Global CSS | `src/styles/global.css` |
| Translations | `src/i18n/ui.ts` |
| Images | `public/images/` |
| Config | `astro.config.mjs` |

## Common Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Creating a New Page

1. Create the file in both language folders:

```
src/pages/de/neue-seite.astro
src/pages/en/new-page.astro
```

2. Use the standard template:

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import { getLangFromUrl, useTranslations, url } from '../../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<PageLayout
  title={t('page.newPage.title')}
  description={t('page.newPage.description')}
>
  <section class="section">
    <div class="container-custom">
      <h1>{t('page.newPage.heading')}</h1>
      <!-- Content -->
    </div>
  </section>
</PageLayout>
```

3. Add translations to `src/i18n/ui.ts`:

```typescript
de: {
  'page.newPage.title': 'Neue Seite',
  'page.newPage.description': 'Seitenbeschreibung',
  'page.newPage.heading': 'Überschrift',
},
en: {
  'page.newPage.title': 'New Page',
  'page.newPage.description': 'Page description',
  'page.newPage.heading': 'Heading',
},
```

## Creating a New Component

```astro
---
// src/components/MyComponent.astro
import { getLangFromUrl, useTranslations } from '../i18n/utils';

interface Props {
  title: string;
  variant?: 'default' | 'highlight';
}

const { title, variant = 'default' } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<div class:list={['card', { 'border-primary': variant === 'highlight' }]}>
  <h3>{title}</h3>
  <slot />
</div>
```

## Tailwind Cheat Sheet

### Spacing

```
p-4    padding: 1rem (16px)
m-4    margin: 1rem
px-4   padding-left/right
py-4   padding-top/bottom
mt-4   margin-top
mb-4   margin-bottom
gap-4  flex/grid gap
```

### Flexbox

```html
<div class="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>

<div class="flex flex-col items-center">
  <div>Stacked</div>
  <div>Items</div>
</div>
```

### Grid

```html
<!-- 1 col mobile, 2 tablet, 3 desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

### Responsive

```
no prefix  = mobile (0px+)
sm:        = 640px+
md:        = 768px+
lg:        = 1024px+
xl:        = 1280px+
```

```html
<!-- Hidden on mobile, visible on desktop -->
<div class="hidden lg:block">Desktop only</div>

<!-- Visible on mobile, hidden on desktop -->
<div class="lg:hidden">Mobile only</div>
```

### Colors

```
text-primary       Teal text (#6adcad)
text-foreground    Light text (#F2F6F6)
text-gray-400      Gray text
bg-background      Dark background (#05232C)
bg-secondary       Dark gray bg (#2c2626)
bg-primary         Teal background
```

### Common Utilities

```
rounded-lg         Border radius
shadow-lg          Box shadow
transition-all     Smooth transitions
hover:scale-105    Scale on hover
opacity-50         50% opacity
```

## Custom Classes (from global.css)

```html
<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-tertiary">Tertiary</button>

<!-- Layout -->
<section class="section">
  <div class="container-custom">
    ...
  </div>
</section>

<!-- Cards -->
<div class="card">...</div>
<div class="card hover-lift">...</div>

<!-- Forms -->
<div class="form-group">
  <label class="form-label">Label</label>
  <input class="form-input" />
</div>

<!-- Text effects -->
<h1 class="gradient-text">Gradient Heading</h1>
```

## i18n Quick Reference

```astro
---
import { getLangFromUrl, useTranslations, url } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);  // 'de' or 'en'
const t = useTranslations(lang);
---

<!-- Get translation -->
<h1>{t('page.title')}</h1>

<!-- Translation with parameter -->
<p>{t('greeting', { name: 'Max' })}</p>

<!-- Build URL for current language -->
<a href={url('/contact', lang)}>Contact</a>

<!-- Conditional by language -->
{lang === 'de' ? <p>German</p> : <p>English</p>}
```

## Component Props

```astro
---
interface Props {
  required: string;          // Must be provided
  optional?: string;         // Can be omitted
  withDefault?: string;      // Optional with default
  union?: 'a' | 'b' | 'c';  // Specific values only
  callback?: () => void;     // Function
  items?: string[];          // Array
  config?: {                 // Object
    key: string;
    value: number;
  };
}

const {
  required,
  optional,
  withDefault = 'default value',
  union = 'a',
  callback,
  items = [],
  config
} = Astro.props;
---
```

## Conditional Rendering

```astro
<!-- Show if true -->
{condition && <div>Shown</div>}

<!-- Either/or -->
{condition ? <div>True</div> : <div>False</div>}

<!-- Loop -->
{items.map(item => <li>{item}</li>)}

<!-- Loop with index -->
{items.map((item, i) => <li key={i}>{item}</li>)}

<!-- Show if array not empty -->
{items.length > 0 && (
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
)}
```

## Dynamic Classes

```astro
---
const isActive = true;
const variant = 'primary';
---

<!-- class:list syntax -->
<div class:list={[
  'base-class',
  `variant-${variant}`,
  { 'is-active': isActive }
]}>
```

## Slots

```astro
<!-- Component with slot -->
<div class="wrapper">
  <slot />                    <!-- Default slot -->
  <slot name="footer" />      <!-- Named slot -->
</div>

<!-- Usage -->
<Wrapper>
  <p>Goes to default slot</p>
  <p slot="footer">Goes to footer slot</p>
</Wrapper>
```

## Images

```html
<!-- From public folder -->
<img src="/images/photo.jpg" alt="Description" />

<!-- With lazy loading -->
<img src="/images/photo.jpg" alt="Description" loading="lazy" />

<!-- Responsive -->
<img
  src="/images/photo.jpg"
  alt="Description"
  class="w-full h-auto"
/>
```

## Links

```astro
---
import { url } from '../i18n/utils';
const lang = getLangFromUrl(Astro.url);
---

<!-- Internal link (translated) -->
<a href={url('/contact', lang)}>Contact</a>

<!-- External link -->
<a href="https://example.com" target="_blank" rel="noopener">
  External
</a>

<!-- With button style -->
<a href={url('/demo', lang)} class="btn btn-primary">
  Get Demo
</a>
```

## Common Patterns

### Section with Heading

```astro
<section class="section">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        {t('section.title')}
      </h2>
      <p class="text-gray-400 max-w-2xl mx-auto">
        {t('section.description')}
      </p>
    </div>

    <!-- Content grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ...
    </div>
  </div>
</section>
```

### Card Grid

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div class="card hover-lift">
      <h3 class="text-xl font-semibold mb-2">{item.title}</h3>
      <p class="text-gray-400">{item.description}</p>
    </div>
  ))}
</div>
```

### Two-Column Layout

```astro
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <!-- Text -->
  <div>
    <h2 class="text-3xl font-bold mb-4">{t('title')}</h2>
    <p class="text-gray-400 mb-6">{t('description')}</p>
    <a href={url('/learn-more', lang)} class="btn btn-primary">
      {t('btn.learnMore')}
    </a>
  </div>

  <!-- Image -->
  <div>
    <img src="/images/feature.png" alt="" class="rounded-xl" />
  </div>
</div>
```

### CTA Section

```astro
<section class="section bg-primary/10">
  <div class="container-custom text-center">
    <h2 class="text-3xl font-bold mb-4">{t('cta.title')}</h2>
    <p class="text-gray-400 mb-8 max-w-xl mx-auto">
      {t('cta.description')}
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href={url('/demo', lang)} class="btn btn-primary">
        {t('btn.getDemo')}
      </a>
      <a href={url('/contact', lang)} class="btn btn-secondary">
        {t('btn.contact')}
      </a>
    </div>
  </div>
</section>
```

## Debugging Tips

```astro
<!-- Log to server console (build time) -->
---
console.log('Props:', Astro.props);
console.log('URL:', Astro.url.pathname);
---

<!-- Show in browser -->
<pre>{JSON.stringify(data, null, 2)}</pre>

<!-- Check current language -->
<p>Current language: {lang}</p>
```

## File Naming

- **Pages**: lowercase, kebab-case (`new-feature.astro`)
- **Components**: PascalCase (`FeatureCard.astro`)
- **Layouts**: PascalCase (`PageLayout.astro`)
- **Utilities**: camelCase (`utils.ts`)
- **Styles**: kebab-case (`global.css`)
