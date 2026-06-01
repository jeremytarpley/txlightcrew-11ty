# Texas Light Crew — Eleventy Static Site

Professional Christmas Light Installation website built with [Eleventy](https://www.11ty.dev/) for deployment on Cloudflare Pages.

## Quick Start

```bash
npm install
npm start        # dev server at http://localhost:8080
npm run build    # production build → _site/
```

## Project Structure

```
txlightcrew-11ty/
├── src/
│   ├── _includes/       # Partials (header, footer, quote-modal)
│   ├── _layouts/        # Page layouts (base.njk)
│   ├── css/
│   │   └── main.css     # Full stylesheet (loaded deferred)
│   ├── js/
│   │   └── main.js      # Lightweight vanilla JS (deferred)
│   ├── images/          # Local image assets
│   │   └── icons/       # SVG stat icons
│   └── index.njk        # Homepage
├── .eleventy.js         # Eleventy config
├── package.json
└── _site/               # Build output (gitignored)
```

## Adding Images

Download the original images from the WordPress site and place them in `src/images/`:

| Filename | Source URL |
|----------|-----------|
| `logo.svg` | `/wp-content/uploads/2021/09/Logo.svg` |
| `logo-footer.svg` | `/wp-content/uploads/2021/09/footer_logo.svg` |
| `hero.jpg` | `/wp-content/uploads/2021/09/home1.jpg` (or any hero image) |
| `home2.jpg` | `/wp-content/uploads/2021/09/home2.jpg` |
| `home4.jpg` | `/wp-content/uploads/2021/09/home4.jpg` |
| `home5.jpg` | `/wp-content/uploads/2021/09/home5.jpg` |
| `home7.jpg` | `/wp-content/uploads/2021/09/home7.jpg` |
| `home9.jpg` | `/wp-content/uploads/2021/09/home9.jpg` |
| `home10.jpg` | `/wp-content/uploads/2021/09/home10.jpg` |
| `home11.jpg` | `/wp-content/uploads/2021/09/home11.jpg` |
| `home12.jpg` | `/wp-content/uploads/2021/09/home12.jpg` |
| `home_slider.jpg` | `/wp-content/uploads/2021/09/home_slider.jpg` |
| `IMG-2699-1.jpg` | `/wp-content/uploads/2021/09/IMG-2699-1.jpg` |
| `storage-install.jpg` | `/wp-content/uploads/2021/09/storage-emulated-0-DCIM-Camera-1129201808b-HDR-1.jpg` |
| `JPEG-image-6.jpg` | `/wp-content/uploads/2021/09/JPEG-image-6.jpg` |
| `IMG-1015.jpg` | `/wp-content/uploads/2021/09/IMG-1015.jpg` |
| `IMG-1016.jpg` | `/wp-content/uploads/2021/09/IMG-1016.jpg` |
| `IMG_2174.jpg` | `/wp-content/uploads/2021/09/IMG_2174.jpg` |
| `IMG_6361.jpg` | `/wp-content/uploads/2021/09/IMG_6361.jpg` |

**Tip:** Run this to batch-download from the live site:
```bash
cd src/images
curl -O https://texaslightcrew.com/wp-content/uploads/2021/09/Logo.svg
curl -O https://texaslightcrew.com/wp-content/uploads/2021/09/footer_logo.svg
# etc.
```

## Self-Hosted Fonts

For best performance, self-host Playfair Display and Source Sans 3. Download WOFF2 subsets from Google Fonts and add `@font-face` blocks to the top of `src/css/main.css`:

```css
@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/playfair-display-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

Place font files in `src/fonts/` and add `eleventyConfig.addPassthroughCopy("src/fonts")` to `.eleventy.js`.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub: `https://github.com/jeremytarpley/txlightcrew-11ty`
2. In the Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**
3. Select `txlightcrew-11ty`, then set:

| Setting | Value |
|---------|-------|
| Framework preset | Eleventy |
| Build command | `npx @11ty/eleventy` |
| Build directory | `_site` |

4. Deploy. Every push to `main` auto-deploys.

## Performance Notes

- **Critical CSS** is inlined in `<head>` (above-the-fold styles only)
- **Full CSS** is loaded with `rel="preload"` + `onload` swap (zero render-blocking)
- **JS** is deferred — never blocks parsing
- **Hero image** uses `fetchpriority="high"` for LCP optimization
- **Below-fold images** use `loading="lazy" decoding="async"`
- **No external CDN resources** (all CSS/JS/fonts are local)
- **Animations respect** `prefers-reduced-motion`

## WCAG 2.1 AA Compliance

- Skip-to-content link
- All images have descriptive `alt` text (decorative images use `alt=""`)
- Color contrast meets AA ratios (navy/white, gold on navy)
- All interactive elements have visible focus indicators
- Modal has focus trap and `aria-labelledby`/`aria-describedby`
- Navigation uses proper ARIA roles (`aria-expanded`, `aria-haspopup`, `aria-label`)
- Stats section uses `<dl>/<dt>/<dd>` for semantic data
