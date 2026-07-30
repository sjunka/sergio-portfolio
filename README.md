# sergiojunca.online

Three routes: `/` (landing), `/about` (the full CV page), `/blog` and `/blog/:slug`.

## Publishing a blog post

Add a markdown file to `src/content/blog/` named `<slug>.<lang>.md`, where lang is
`en` or `es`. Commit to `main` and the GitHub Action builds and deploys it.

```markdown
---
title: Your FlatList isn't slow, your renderItem is
date: 2026-04-18
summary: One sentence that sells the read. Used on cards and in link previews.
tags: react-native, performance
---

Body in markdown. Code fences, headings, lists and links are all styled.
```

- Post numbers (`001`, `002`) come from publication order, oldest first. Don't set them.
- Reading time is counted from the body.
- A post with only an `.en.md` file shows to Spanish readers in English with a notice.
  Add `<slug>.es.md` with the same `date` to translate it.
- `npm run build` regenerates `dist/sitemap.xml` and writes the `404.html` that makes
  deep links work on GitHub Pages. Don't edit either by hand.

## Testing

Three layers: Vitest + Testing Library for units and integration, Playwright for
end-to-end against the real production build.

```bash
npm run test           # vitest, watch mode
npm run test:unit      # vitest, one shot
npm run test:coverage  # vitest + v8 coverage report
npm run test:e2e       # playwright, builds and serves dist first
npm run test:e2e:ui    # playwright, interactive runner
npm run test:e2e:report      # open the last HTML report
npm run test:e2e:screenshots # regenerate the images below
npm run test:all       # lint + unit + e2e
npm run doctor         # react-doctor health score
```

### What runs where

| Layer | Runner | Environment | Files | Tests |
| --- | --- | --- | --- | --- |
| Unit | Vitest | jsdom | 7 | 37 |
| Integration | Vitest + Testing Library | jsdom, real router | 2 | 18 |
| E2E | Playwright | Chromium, built `dist/` | 8 | 176 (88 × 2 projects) |

Totals: **55 Vitest tests, 176 Playwright tests** (168 run, 8 skipped by viewport).

### Unit tests

| File | Tests | Covers |
| --- | --- | --- |
| `src/lib/posts.test.ts` | 13 | frontmatter parsing, release numbering, language fallback, reading time, tag list, date formatting |
| `src/lib/utils.test.ts` | 5 | `cn` merging and Tailwind conflict resolution |
| `src/lib/motion.test.ts` | 3 | `prefersReducedMotion` reads the media query live |
| `src/i18n/index.test.ts` | 4 | en/es key parity, no empty strings, no untranslated nav |
| `src/hooks/useTheme.test.ts` | 5 | default, stored value, toggle, DOM class, persistence |
| `src/hooks/useTranslation.test.ts` | 3 | dictionary lookup through the provider |
| `src/components/sections/Contact.test.tsx` | 4 | field rendering, zod validation, label/input wiring |

### Integration tests

Mount the whole `App` — real router, real providers, real content files.

| File | Tests | Covers |
| --- | --- | --- |
| `src/test/integration/routing.test.tsx` | 10 | every route renders, markdown becomes HTML, unknown slug and unknown route, navbar navigation, `aria-current`, skip link |
| `src/test/integration/preferences.test.tsx` | 8 | theme apply/persist/restore, language switch and persistence, mobile menu aria state and scroll lock |

### End-to-end tests

Playwright builds the site, serves `dist/` with `vite preview`, and runs every
spec twice — once as Desktop Chrome (1280×720), once as a Pixel 5 (393×851).

| Spec | Tests/project | Covers |
| --- | --- | --- |
| `e2e/a11y.spec.ts` | 19 | one h1 per page, no skipped heading levels, image alts, labelled icon buttons, keyboard-only navigation, skip link focus, reduced motion, list semantics, `noopener` on external links |
| `e2e/seo.spec.ts` | 15 | one canonical per route pointing at the trailing-slash URL, title/description/og per route, article vs website `og:type`, JSON-LD shape, sitemap contents, `404.html`, manifest |
| `e2e/navigation.spec.ts` | 13 | every deep link returns **200** (not the 404 fallback), 404 page, `aria-current`, scroll reset between routes, scrolled navbar background, mobile burger menu |
| `e2e/blog.spec.ts` | 12 | post ordering and numbering, tag filtering, markdown rendered as HTML, prev/next, author links, unknown slug, no script execution from the markdown pipeline |
| `e2e/about.spec.ts` | 11 | all five sections present and named, in-page anchors, deep link into a lazy section, animated counters settle, contact form validation and `aria-invalid`/`aria-describedby` |
| `e2e/preferences.spec.ts` | 8 | theme and language survive a reload, background actually repaints, no wrong-theme flash, Spanish post served, English fallback notice |
| `e2e/landing.spec.ts` | 7 | hero content, landmarks, both CTAs, resume download, zero console errors |
| `e2e/screenshots.spec.ts` | 3 | generates the images below |

Eight tests are viewport-gated: the desktop navbar links and the resume button are
`hidden` below Tailwind's `md`, so the mobile project skips them and covers the same
journeys through the burger menu instead.

### Coverage

`npm run test:coverage`, v8 provider, excluding i18n dictionaries, static data and
entry points:

```
All files          |   81.51 |    74.92 |   84.09 |   84.07
 src/lib           |   94.87 |    73.91 |     100 |     100
 src/pages         |   93.68 |    77.35 |   93.02 |   97.14
 src/context       |   90.47 |       75 |    87.5 |     100
 src/hooks         |      88 |       75 |      80 |     100
 src/components    |   42.85 |       50 |      50 |   42.85
                     ^stmts    ^branch   ^funcs   ^lines
```

Presentational components sit low on purpose — Playwright asserts what they render
in a real browser, which is cheaper to maintain than snapshotting markup in jsdom.

### Failure artifacts

Playwright keeps a trace on first retry, plus a screenshot and video for anything
that fails, under `test-results/`. `npm run test:e2e:report` opens the HTML report.
All three directories are gitignored.

### CI

`.github/workflows/deploy.yml` runs lint, `tsc -b`, the Vitest suite and the full
Playwright suite on every push to `main` and every pull request against it. The
deploy job has `needs: test`, so a red suite blocks the release; pull requests get
the gate without deploying. A failing e2e run uploads its HTML report as a
`playwright-report` artifact, kept for 7 days.

### Health score

`npm run doctor` runs [react-doctor](https://react.doctor). Current score:

```
┌─────┐  100 / 100 Great
│ ^ ^ │  0 errors, 0 warnings
│  ▽  │
└─────┘
```

### Screenshots

Generated by `npm run test:e2e:screenshots` from the built site — refresh them
after any UI change rather than editing them by hand.

| Landing, light | Landing, dark |
| --- | --- |
| ![Landing page in light theme](docs/screenshots/landing-light.png) | ![Landing page in dark theme](docs/screenshots/landing-dark.png) |

| Writing index | Blog post |
| --- | --- |
| ![Blog index listing three posts](docs/screenshots/blog-light.png) | ![A blog post rendered from markdown](docs/screenshots/blog-hiring-mobile-engineers-light.png) |

| About page | Contact form, error state |
| --- | --- |
| ![About page hero and sections](docs/screenshots/about-light.png) | ![Contact form showing three validation errors](docs/screenshots/contact-errors.png) |

| Mobile landing | Mobile menu | Mobile writing index |
| --- | --- | --- |
| ![Landing page at mobile width](docs/screenshots/landing-mobile.png) | ![Burger menu open at mobile width](docs/screenshots/menu-mobile.png) | ![Blog index at mobile width](docs/screenshots/blog-mobile.png) |

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
