# Component Patterns

This guide explains how components are structured in the VICUS website.

## Component Categories

```
src/components/
├── ui/                    # Low-level primitives
│   ├── Button.astro
│   ├── Card.astro
│   └── Section.astro
├── Header.astro           # Navigation
├── Footer.astro           # Site footer
├── Hero.astro             # Hero sections
├── Features.astro         # Feature grids
├── ContactForm.astro      # Form components
├── FAQ.astro              # Accordion
└── ...                    # Other components
```

## Anatomy of a Component

Every component follows this structure:

```astro
---
// ============================================
// 1. IMPORTS
// ============================================
import { getLangFromUrl, useTranslations, url } from '../i18n/utils';
import Button from './ui/Button.astro';

// ============================================
// 2. PROPS INTERFACE
// ============================================
interface Props {
  title: string;              // Required prop
  description?: string;       // Optional prop (has ?)
  variant?: 'default' | 'highlight';  // Union type
  items?: Array<{             // Array of objects
    label: string;
    href: string;
  }>;
}

// ============================================
// 3. PROPS DESTRUCTURING WITH DEFAULTS
// ============================================
const {
  title,
  description = '',          // Default value
  variant = 'default',
  items = []
} = Astro.props;

// ============================================
// 4. COMPONENT LOGIC
// ============================================
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const isHighlighted = variant === 'highlight';
---

<!-- ========================================== -->
<!-- 5. TEMPLATE -->
<!-- ========================================== -->
<div class:list={['card', { 'card-highlight': isHighlighted }]}>
  <h3 class="text-xl font-bold">{title}</h3>

  {description && (
    <p class="text-gray-400 mt-2">{description}</p>
  )}

  {items.length > 0 && (
    <ul class="mt-4 space-y-2">
      {items.map(item => (
        <li>
          <a href={item.href} class="text-primary hover:underline">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )}

  <!-- Slot for additional content -->
  <slot />
</div>

<!-- ========================================== -->
<!-- 6. SCOPED STYLES (optional) -->
<!-- ========================================== -->
<style>
  .card-highlight {
    @apply border-2 border-primary;
  }
</style>

<!-- ========================================== -->
<!-- 7. CLIENT SCRIPT (optional) -->
<!-- ========================================== -->
<script>
  // Browser-side interactivity
</script>
```

## UI Primitives (`ui/` folder)

These are the building blocks used by other components.

### Button.astro

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit';
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  class: className = ''
} = Astro.props;

const Tag = href ? 'a' : 'button';
---

<Tag
  href={href}
  type={!href ? type : undefined}
  class:list={[
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className
  ]}
>
  <slot />
</Tag>
```

Usage:
```astro
<Button variant="primary" href="/contact">Contact Us</Button>
<Button variant="secondary" type="submit">Submit</Button>
```

### Card.astro

```astro
---
interface Props {
  hover?: boolean;
  class?: string;
}

const { hover = false, class: className = '' } = Astro.props;
---

<div class:list={['card', { 'hover-lift': hover }, className]}>
  <slot />
</div>
```

Usage:
```astro
<Card hover>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

### Section.astro

```astro
---
interface Props {
  id?: string;
  class?: string;
  background?: 'default' | 'alternate';
}

const { id, class: className = '', background = 'default' } = Astro.props;
---

<section
  id={id}
  class:list={[
    'section',
    background === 'alternate' ? 'bg-secondary' : 'bg-background',
    className
  ]}
>
  <div class="container-custom">
    <slot />
  </div>
</section>
```

Usage:
```astro
<Section id="features" background="alternate">
  <h2>Our Features</h2>
  ...
</Section>
```

## Layout Components

### BaseLayout.astro

The root layout that wraps every page:

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  noindex?: boolean;
}

const { title, description, noindex = false } = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang={/* ... */}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    {noindex && <meta name="robots" content="noindex" />}
    <!-- fonts, favicon, etc. -->
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### PageLayout.astro

Extends BaseLayout with an optional hero:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Hero from '../components/Hero.astro';

interface Props {
  title: string;
  description: string;
  heroTitle?: string;
  heroDescription?: string;
  showHero?: boolean;
}

const {
  title,
  description,
  heroTitle,
  heroDescription,
  showHero = true
} = Astro.props;
---

<BaseLayout title={title} description={description}>
  {showHero && (
    <Hero title={heroTitle || title} description={heroDescription} />
  )}
  <slot />
</BaseLayout>
```

## Common Component Patterns

### Pattern 1: Translatable Component

Most components need translations:

```astro
---
import { getLangFromUrl, useTranslations, url } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<nav>
  <a href={url('/', lang)}>{t('nav.home')}</a>
  <a href={url('/features', lang)}>{t('nav.features')}</a>
  <a href={url('/contact', lang)}>{t('nav.contact')}</a>
</nav>
```

### Pattern 2: Conditional Rendering

```astro
---
interface Props {
  showBadge?: boolean;
  items?: string[];
}

const { showBadge = false, items = [] } = Astro.props;
---

<!-- Conditional element -->
{showBadge && <span class="badge">New</span>}

<!-- Ternary for either/or -->
{items.length > 0 ? (
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
) : (
  <p>No items found.</p>
)}
```

### Pattern 3: Dynamic Classes

```astro
---
interface Props {
  variant: 'primary' | 'secondary';
  isActive: boolean;
  size: 'sm' | 'md' | 'lg';
}

const { variant, isActive, size } = Astro.props;
---

<!-- Using class:list -->
<div class:list={[
  'base-class',
  `variant-${variant}`,
  `size-${size}`,
  { 'is-active': isActive },
  { 'is-inactive': !isActive }
]}>
  ...
</div>

<!-- Results in something like: -->
<!-- class="base-class variant-primary size-md is-active" -->
```

### Pattern 4: Loops with Index

```astro
---
const features = [
  { title: 'Fast', icon: '⚡' },
  { title: 'Secure', icon: '🔒' },
  { title: 'Simple', icon: '✨' },
];
---

<div class="grid grid-cols-3 gap-4">
  {features.map((feature, index) => (
    <div
      class="card"
      style={`animation-delay: ${index * 100}ms`}
    >
      <span class="text-2xl">{feature.icon}</span>
      <h3>{feature.title}</h3>
    </div>
  ))}
</div>
```

### Pattern 5: Slots with Fallback

```astro
---
// Card.astro
---
<div class="card">
  <div class="card-header">
    <slot name="header">
      <!-- Fallback content if no header slot provided -->
      <h3>Default Title</h3>
    </slot>
  </div>

  <div class="card-body">
    <slot>
      <!-- Fallback for default slot -->
      <p>No content provided.</p>
    </slot>
  </div>

  <div class="card-footer">
    <slot name="footer" />
    <!-- No fallback = nothing rendered if slot empty -->
  </div>
</div>

<!-- Usage -->
<Card>
  <h3 slot="header">Custom Title</h3>
  <p>Main content here.</p>
  <button slot="footer">Action</button>
</Card>
```

### Pattern 6: Passing Props to Children

```astro
---
// FeatureList.astro
interface Props {
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  cardVariant?: 'default' | 'bordered';
}

const { features, cardVariant = 'default' } = Astro.props;
---

<div class="grid grid-cols-3 gap-6">
  {features.map(feature => (
    <FeatureCard
      title={feature.title}
      description={feature.description}
      icon={feature.icon}
      variant={cardVariant}
    />
  ))}
</div>
```

### Pattern 7: Component with Client Script

```astro
---
// Accordion.astro
interface Props {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

const { items } = Astro.props;
---

<div class="accordion" data-accordion>
  {items.map((item, index) => (
    <div class="accordion-item" data-accordion-item>
      <button
        class="accordion-trigger"
        data-accordion-trigger
        aria-expanded="false"
      >
        {item.question}
        <svg class="accordion-icon">...</svg>
      </button>
      <div class="accordion-content" data-accordion-content>
        <p>{item.answer}</p>
      </div>
    </div>
  ))}
</div>

<script>
  // Client-side accordion logic
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('[data-accordion-item]');
      const content = item.querySelector('[data-accordion-content]');
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      trigger.setAttribute('aria-expanded', String(!isOpen));
      content.classList.toggle('hidden', isOpen);
    });
  });
</script>

<style>
  .accordion-content {
    @apply hidden overflow-hidden;
  }

  .accordion-content:not(.hidden) {
    @apply block;
  }

  .accordion-icon {
    @apply transition-transform;
  }

  [aria-expanded="true"] .accordion-icon {
    @apply rotate-180;
  }
</style>
```

## Form Components

Forms in this project integrate with HubSpot:

```astro
---
// ContactForm.astro
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const HUBSPOT_PORTAL_ID = import.meta.env.PUBLIC_HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = import.meta.env.PUBLIC_HUBSPOT_CONTACT_FORM_ID;
---

<form
  class="space-y-6"
  data-hubspot-portal={HUBSPOT_PORTAL_ID}
  data-hubspot-form={HUBSPOT_FORM_ID}
>
  <div class="form-group">
    <label for="name" class="form-label">
      {t('form.name')} <span class="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      class="form-input"
    />
  </div>

  <div class="form-group">
    <label for="email" class="form-label">
      {t('form.email')} <span class="text-red-500">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      class="form-input"
    />
  </div>

  <div class="form-group">
    <label for="message" class="form-label">
      {t('form.message')}
    </label>
    <textarea
      id="message"
      name="message"
      rows="4"
      class="form-input"
    ></textarea>
  </div>

  <button type="submit" class="btn btn-primary w-full">
    {t('btn.submit')}
  </button>
</form>

<script>
  // Form submission handling
  document.querySelectorAll('form[data-hubspot-portal]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      // ... HubSpot API submission logic
    });
  });
</script>
```

## Component Communication

### Parent to Child: Props

```astro
<!-- Parent -->
<ChildComponent title="Hello" count={5} />

<!-- Child -->
---
const { title, count } = Astro.props;
---
<h1>{title}</h1>
<p>Count: {count}</p>
```

### Child to Parent: Not Directly Possible

Astro components render at build time, so there's no runtime communication. For interactivity:

1. Use client-side JavaScript with custom events
2. Use a framework component (React, Vue, Svelte)

### Sharing Data: Through Props Drilling or Context

```astro
<!-- Page -->
---
const sharedData = { theme: 'dark', user: 'John' };
---
<Layout>
  <Header theme={sharedData.theme} user={sharedData.user} />
  <Main theme={sharedData.theme} />
  <Footer theme={sharedData.theme} />
</Layout>
```

## Best Practices

### 1. Keep Components Focused

Each component should do one thing well:

```
❌ BigComponent.astro (header + navigation + hero + features)
✅ Header.astro
✅ Navigation.astro
✅ Hero.astro
✅ Features.astro
```

### 2. Use Semantic Props Names

```astro
<!-- Good -->
<Button variant="primary" size="lg" />
<Card isHighlighted={true} />

<!-- Avoid -->
<Button type="1" s="3" />
<Card h={true} />
```

### 3. Provide Sensible Defaults

```astro
---
interface Props {
  variant?: 'default' | 'highlight';  // Optional with ?
  size?: 'sm' | 'md' | 'lg';
}

const {
  variant = 'default',  // Default value
  size = 'md'
} = Astro.props;
---
```

### 4. Document Complex Components

```astro
---
/**
 * Feature Card Component
 *
 * Displays a feature with icon, title, and description.
 *
 * @example
 * <FeatureCard
 *   icon="chart"
 *   title="Analytics"
 *   description="Track your metrics"
 *   href="/analytics"
 * />
 */
interface Props {
  /** Icon name from the icon set */
  icon: string;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional link URL */
  href?: string;
}
---
```

### 5. Use TypeScript Interfaces

Always define prop types for better IDE support and error catching:

```astro
---
interface Props {
  // TypeScript will catch errors if wrong types are passed
  count: number;        // Must be number
  label: string;        // Must be string
  onClick?: () => void; // Optional function
}
---
```

## Next Steps

- [Internationalization](./04-i18n.md) - Multi-language support
- [Quick Reference](./05-quick-reference.md) - Common patterns cheat sheet
