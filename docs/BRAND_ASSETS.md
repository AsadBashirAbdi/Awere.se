# Brand Assets Guide

This guide explains where and how to update AWERE brand assets.

## Logo

**Location:** `/public/brand/logo.svg`

### Usage in code:

```tsx
import { Logo } from "@/components/brand/Logo";

<Logo size="sm" variant="mark" />
<Logo size="md" variant="lockup" />
```

### Sizes:
- `sm` = 24px height (header, inline)
- `md` = 32px height (default)
- `lg` = 48px height (hero, featured)

### Variants:
- `mark` = logo only
- `lockup` = logo + "AWERE" text

### Theme compatibility:
The logo SVG uses `fill="#151f28"` (dark) by default.
- Works on light backgrounds (studio mode)
- For dark backgrounds (blueprint mode), ensure sufficient contrast

## Favicon

**Location:** `/public/favicon.svg`

The favicon uses a dark background (#151f28) with the white/accent logo centered.

### Browser support:
Modern browsers support SVG favicons. The current setup works well for:
- Chrome, Edge, Firefox, Safari (desktop + mobile)

### To replace:
1. Edit `/public/favicon.svg`
2. Ensure it's 512x512 viewBox
3. Use dark background for consistency
4. Keep file size < 5KB

## Hero Images (optional)

**Locations:**
- `/public/brand/hero-1.svg`
- `/public/brand/hero-2.svg`

These are reference assets. The actual hero uses a CSS/SVG artifact (see `HeroArtifact.tsx`).

To use a custom hero image:
1. Replace the artifact in `/components/sections/HeroArtifact.tsx`
2. Or add `<img src="/brand/hero-1.svg" ... />` in the Hero component
3. Ensure it's theme-aware (use CSS filters or conditional rendering)

## OG Images (Open Graph / Twitter)

**Locations:**
- `/app/opengraph-image.tsx` (generated dynamically)
- `/app/twitter-image.tsx` (reuses opengraph-image)

These generate images at build time using Next.js `ImageResponse`.

### To customize:
Edit `/app/opengraph-image.tsx`:
- Change colors, typography, or layout
- Add your logo from `/public/brand/logo.svg` (requires base64 or URL)
- Keep dimensions: 1200x630 (standard OG size)

### Verification:
- Test locally: `http://localhost:3000/opengraph-image`
- Test in production: `https://awere.se/opengraph-image`
- Use [OpenGraph.xyz](https://www.opengraph.xyz/) or Twitter Card Validator

## Brand Colors

**Studio (default):**
- Background: `#fafafa`
- Surface: `#ffffff`
- Accent: `#ff4f00` (orange)
- Text: `#171717`

**Blueprint:**
- Background: `#0a0e14`
- Surface: `#141b24`
- Accent: `#00d9ff` (cyan)
- Text: `#e6edf3`

All colors are defined in `/app/globals.css` under `:root[data-theme="..."]`.

## Typography

**Fonts:**
- Sans: Geist Sans (loaded via `next/font/google`)
- Mono: Geist Mono

**Usage:**
Fonts are available as CSS variables:
- `var(--font-geist-sans)`
- `var(--font-geist-mono)`

## Quick Checklist

- [ ] Logo updated in `/public/brand/logo.svg`
- [ ] Favicon updated in `/public/favicon.svg`
- [ ] Hard refresh browser to see favicon changes (Cmd+Shift+R)
- [ ] OG image verified at `/opengraph-image`
- [ ] Share preview tested (LinkedIn, Twitter, Slack)

---

**Need help?** See `/docs/OWNER_GUIDE.md` for deployment and `/docs/EMAIL_SETUP.md` for contact form.
