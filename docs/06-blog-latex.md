# Blog Posts & LaTeX Math Formulas

This document explains how to write blog posts and use LaTeX math formulas in the VICUS Software website.

## Blog Post Location

Blog posts are stored in:
- German: `src/content/blog/de/`
- English: `src/content/blog/en/`

## Frontmatter

Each blog post requires frontmatter at the top:

```yaml
---
title: "Your Blog Post Title"
description: "A brief description for SEO and previews."
pubDate: 2025-01-27
updatedDate: 2025-01-28  # optional
author: "Author Name"
tags: ["Tag1", "Tag2", "Tag3"]
lang: "de"  # or "en"
---
```

## LaTeX Math Formulas

The website uses [KaTeX](https://katex.org/) via `remark-math` and `rehype-katex` for rendering LaTeX formulas.

### Block Formulas (Centered)

Use double dollar signs `$$` for block/display math:

```markdown
The energy balance equation:

$$
C_k \cdot \frac{\partial T_k}{\partial t} = \dot{H}_{in,k} - \dot{H}_{out,k} - \dot{Q}_{loss,k}
$$
```

**Important:** Leave empty lines before and after the `$$` block.

### Inline Formulas

Use single dollar signs `$` for inline math:

```markdown
The Reynolds number $Re = \frac{v \cdot d}{\nu}$ determines the flow regime.
```

### Common LaTeX Syntax

| Syntax | Result | Description |
|--------|--------|-------------|
| `\frac{a}{b}` | $\frac{a}{b}$ | Fractions |
| `x^2` | $x^2$ | Superscript |
| `x_i` | $x_i$ | Subscript |
| `\dot{m}` | $\dot{m}$ | Dot above (mass flow rate) |
| `\sum_k` | $\sum_k$ | Summation |
| `\partial` | $\partial$ | Partial derivative |
| `\cdot` | $\cdot$ | Multiplication dot |
| `\times` | $\times$ | Cross multiplication |
| `\left( \right)` | Auto-sized parentheses |
| `\text{word}` | Text within formula |
| `{,}` | German decimal comma |

### Example: Complex Formula

```latex
$$
\text{Förderung} = \left[ 5{,}5 - \left( 6{,}8 - \frac{17}{\text{SCOP}} \right) \times 0{,}75 \right] \times \frac{\text{SCOP}}{\text{SCOP} - 1}
$$
```

### Tips

1. **German decimals**: Use `{,}` for comma as decimal separator: `5{,}5` renders as 5,5
2. **Text in formulas**: Use `\text{...}` for words: `\text{SCOP}`
3. **Fractions**: Use `\frac{numerator}{denominator}`
4. **Subscripts with multiple characters**: Use braces: `T_{ambient}` not `T_ambient`

## Configuration

The LaTeX support is configured in `astro.config.mjs`:

```javascript
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  },
  // ...
});
```

The KaTeX CSS is loaded in `src/layouts/BaseLayout.astro`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
```

## References

- [KaTeX Supported Functions](https://katex.org/docs/supported.html)
- [KaTeX Common Issues](https://katex.org/docs/issues.html)
- [Adding LaTeX to Astro](https://astro-paper.pages.dev/posts/how-to-add-latex-equations-in-blog-posts/)
