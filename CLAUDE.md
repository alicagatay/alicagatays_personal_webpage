# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Ali Cagatay (alicagatay.xyz). Next.js 13 App Router + TypeScript + Tailwind CSS, deployed to Vercel.

## Commands

```bash
npm run dev     # next dev — local server on http://localhost:3000
npm run build   # next build — production build
npm run start   # next start — serve the production build
npm run lint    # next lint (eslint-config-next, core-web-vitals)
```

No test runner is configured. Prettier runs via the `prettier` binary (`npx prettier --write .`); class ordering comes from `prettier-plugin-tailwindcss`.

`NEXT_PUBLIC_SITE_URL` is the only required env var (see `.env.example`); it feeds the RSS `alternates` link in [src/app/\[locale\]/layout.tsx](src/app/[locale]/layout.tsx).

## Architecture

### Localization (the non-obvious part)

This site uses `next-intl` v4 with **locale-prefixed URLs** — pages live at `/en/about`, `/tr/about`, etc. The locale comes from the URL segment, not a cookie or geo header at render time.

Pieces:

- [src/i18n/routing.ts](src/i18n/routing.ts) — `locales = ['en', 'tr']`, `defaultLocale = 'en'`, `localePrefix: 'always'`, `localeDetection: false`, cookie name `NEXT_LOCALE`. Also exports `getLocaleFromCountryCode` (used by the proxy) and `getLocaleFromAcceptLanguage` (currently unused).
- [src/i18n/request.ts](src/i18n/request.ts) — per-request config: reads `requestLocale` (derived from the URL segment), validates against `routing.locales`, falls back to `defaultLocale`, and dynamically imports `messages/{locale}.json`.
- [src/i18n/navigation.ts](src/i18n/navigation.ts) — exports locale-aware `Link`, `useRouter`, `usePathname`, `redirect`, `getPathname` via `createNavigation(routing)`. Use these (not `next/navigation`) anywhere you need to navigate while preserving the locale prefix.
- [next.config.mjs](next.config.mjs) — wires the `next-intl` plugin to `./src/i18n/request.ts`.
- `messages/en.json`, `messages/tr.json` — translation strings.

Geolocation lives in [src/proxy.ts](src/proxy.ts) (Next.js proxy / middleware-equivalent), not in `request.ts`. On a request to `/` with no `NEXT_LOCALE` cookie, the proxy reads `x-vercel-ip-country` / `cf-ipcountry` / `cloudfront-viewer-country` / `x-country-code`, maps `TR` → `tr` and anything else → `en` via `getLocaleFromCountryCode`, and 307s to `/{locale}`. All other requests pass through `createMiddleware(routing)` from `next-intl/middleware`. Next.js metadata file conventions (`/opengraph-image`, `/twitter-image`, `/apple-icon`, `/icon`) are bypassed — they live at the app root, not under `[locale]`.

[LanguageSwitcher.tsx](src/components/LanguageSwitcher.tsx) switches language by (1) writing a 1-year `NEXT_LOCALE` cookie with `samesite=lax`, then (2) calling `router.replace(pathname, { locale: nextLocale })` so next-intl swaps the locale prefix while keeping the rest of the path. The cookie's main job is to suppress the proxy's geo-based redirect on subsequent visits to `/`.

Server Components call `getTranslations(...)` from `next-intl/server`; Client Components call `useTranslations(...)` / `useLocale()`. Server Components in the `[locale]` tree should also call `setRequestLocale(locale)` (see [layout.tsx:103](src/app/[locale]/layout.tsx:103)) to enable static rendering. Inside `generateMetadata` use the explicit-locale form `getTranslations({ locale, namespace })` — `setRequestLocale` hasn't run yet at that point.

**Adding a new locale**: update `locales` in [routing.ts](src/i18n/routing.ts), add the messages file under `messages/`, and update `getLocaleFromCountryCode` (and `getLocaleFromAcceptLanguage` if you start using it) so the proxy can map country codes to the new locale.

### Translation file structure (where copy lives)

Every translatable string on the site lives in `messages/en.json` or `messages/tr.json`. There are no inline `Record<Locale, ...>` blocks in page files — that pattern was deliberately migrated out. The two files mirror the same key tree; keep them in sync (a missing key in one locale throws at runtime).

Shape:

- `common.*` — shared chrome (nav, footer, theme switcher, language switcher, social tooltips, 404 page). Consumed by `Header`, `Footer`, `LanguageSwitcher`, `not-found`.
- `siteMeta.{titleTemplate, titleDefault, description}` — site-wide title template (`"%s - Ali Cagatay"`), default `<title>` when no page-level title is set, and the default meta description. Consumed by [\[locale\]/layout.tsx](src/app/[locale]/layout.tsx)'s `generateMetadata`.
- One namespace per page: `home`, `about`, `projects`, `work`, `education`, `hackathons`, `gear`, `writings`, `thankYou`, `workWithMe`. Each contains:
  - `meta.title` — the page's short title (e.g. `"About"`, `"Projects"`, `"Yazılar"`). **Do NOT include `- Ali Cagatay`** — the brand suffix is appended automatically (see below). `home.meta.title` is intentionally absent so the layout's `siteMeta.titleDefault` wins.
  - `meta.description` — page-level meta description, also used for `og:description` and `twitter:description`.
  - Plus the page's body content (title, intro, paragraphs, entry arrays like `work.entries[*]`, item maps like `projects.items.<id>` — whatever the page renders).

Metadata helper: each page's `generateMetadata` calls `getTranslations({ locale, namespace: '<page>.meta' })` and passes `title` / `description` to [`buildPageMetadata`](src/lib/metadata.ts). The helper returns a `Metadata` object with canonical URL, `alternates.languages` for both locales, OG, and Twitter card. Two behaviors worth knowing:

- The layout sets `title: { template: '%s - Ali Cagatay', default: '<siteDefault>' }`, so a page-level `title: 'Projects'` renders as `<title>Projects - Ali Cagatay</title>`.
- The helper appends `- Ali Cagatay` to `og:title` / `twitter:title` itself (`og:title` doesn't go through the layout's title template, so the helper does it explicitly to keep social shares consistent with `<title>`).
- When `title` is omitted (the `buildPageMetadata` input accepts `title?: string`), no `<title>` / `og:title` / `twitter:title` is set at all and the layout's `siteMeta.titleDefault` becomes the page title. The home page uses this.

If a page renders a string from JSON in its body (not just metadata), call `getTranslations('<page>')` and use `t('title')`, `t('intro')`, `t.raw('paragraphs')` etc. Use `t.raw(...)` for arrays/objects (e.g. `work.entries`, `gear.sections`, `home.photoAlts`) — `t(...)` only returns strings.

### Routing and layout

App Router under [src/app/](src/app). All user-facing routes live under [src/app/\[locale\]/](src/app/[locale]/) — `/`, `/about`, `/projects`, `/education`, `/work`, `/hackathons`, `/gear`, `/writings`, `/thank-you`, plus the legacy `/work-with-me-old-link-update-later`. The locale-aware [\[locale\]/layout.tsx](src/app/[locale]/layout.tsx) owns the `<html>` / `<body>` tags, calls `setRequestLocale`, generates per-locale metadata (`title`, `description`, `alternates.languages`, OG), and wraps children in `NextIntlClientProvider` → `Providers` (theme) → `Layout` (header/footer). `generateStaticParams` emits one entry per locale.

Files directly in `src/app/` are metadata file conventions and shared providers — `favicon.ico`, `feed.xml/route.ts`, `manifest.ts`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, `providers.tsx`. There is no `src/app/layout.tsx`.

Navigation links live in both [Header.tsx](src/components/Header.tsx) and [Footer.tsx](src/components/Footer.tsx) — keep them in sync when adding/removing pages, and add a `nav.<key>` entry to both message files.

### Theming

`next-themes` with `attribute="class"` and `darkMode: 'class'` in Tailwind. `ThemeWatcher` in [providers.tsx](src/app/providers.tsx) re-syncs to `"system"` when the OS preference matches the resolved theme so the toggle stays consistent across tabs.

### Link component

Always import `Link` from [@/components/Link](src/components/Link.tsx), **not** `next/link` directly. It auto-detects external `http(s)` URLs and adds `target="_blank" rel="noopener noreferrer"`; `mailto:` / `tel:` get external treatment without a new tab; `/` and `#` stay internal via `next/link`.

### Path alias

`@/*` → `./src/*` (see [tsconfig.json](tsconfig.json)). Use it everywhere instead of relative paths.

### MDX and writings

Writing posts are MDX files in [src/content/writings/](src/content/writings/) (currently empty after the seed-post cleanup). They're loaded by [src/lib/writings.ts](src/lib/writings.ts) — `fs.readdir` + `gray-matter` for frontmatter — and rendered by the `[locale]/writings/[slug]` route. Code blocks are syntax-highlighted at build time via `rehype-pretty-code` + `shiki`. Frontmatter shape (see `WritingFrontmatter`): `title`, `description`, `date`, optional `author`.

`pageExtensions` in [next.config.mjs](next.config.mjs) is `['ts', 'tsx', 'mdx']`, so `.mdx` files dropped into `src/app/` would also be routable — but today MDX is only used as the content source for writings, not for pages. [src/mdx-components.tsx](src/mdx-components.tsx) is the Next.js MDX customization hook.

## Code style

Prettier config (`prettier.config.js`): single quotes, no semicolons, Tailwind class-ordering plugin. The codebase uses `let` for locals (including in components) rather than `const` — match that style.
