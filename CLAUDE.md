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

`NEXT_PUBLIC_SITE_URL` is the only required env var (see `.env.example`); it feeds the RSS `alternates` link in [layout.tsx](src/app/layout.tsx).

## Architecture

### Localization (the non-obvious part)

This site uses `next-intl` v4 **without** locale segments in the URL — every page renders at `/`, `/about`, etc. regardless of language. Locale is resolved per-request server-side in [src/i18n/request.ts](src/i18n/request.ts):

1. `NEXT_LOCALE` cookie if set,
2. otherwise geolocation header (`x-vercel-ip-country`, `cf-ipcountry`, `cloudfront-viewer-country`, `x-country-code`) — `TR` → `tr`, anything else → `en`,
3. fallback to `defaultLocale` (`en`).

Supported locales live in [src/i18n/routing.ts](src/i18n/routing.ts). Translation strings live in `messages/{en,tr}.json` and are imported dynamically by request.ts. The plugin is wired in [next.config.mjs](next.config.mjs) pointing at `./src/i18n/request.ts`.

There is no middleware. There is no `[locale]` route segment. **Adding a new locale = update `locales` in `routing.ts`, add the messages file, and (if needed) update `getLocaleFromCountryCode` / `getLocaleFromAcceptLanguage`.**

[LanguageSwitcher.tsx](src/components/LanguageSwitcher.tsx) changes language by writing the `NEXT_LOCALE` cookie and calling `router.refresh()` — no navigation. Server Components call `getTranslations(...)` from `next-intl/server`; Client Components call `useTranslations(...)` / `useLocale()`.

### Routing and layout

App Router under [src/app/](src/app). The single root [layout.tsx](src/app/layout.tsx) wraps everything in `NextIntlClientProvider` → `Providers` (theme) → `Layout` (header/footer). Routes: `/`, `/about`, `/projects`, `/education`, `/work`, `/hackathons`, `/gear`, `/thank-you`, plus the legacy `/work-with-me-old-link-update-later`. Navigation links live in both [Header.tsx](src/components/Header.tsx) and [Footer.tsx](src/components/Footer.tsx) — keep them in sync when adding/removing pages, and add a `nav.<key>` entry to both message files.

### Theming

`next-themes` with `attribute="class"` and `darkMode: 'class'` in Tailwind. `ThemeWatcher` in [providers.tsx](src/app/providers.tsx) re-syncs to `"system"` when the OS preference matches the resolved theme so the toggle stays consistent across tabs.

### Link component

Always import `Link` from [@/components/Link](src/components/Link.tsx), **not** `next/link` directly. It auto-detects external `http(s)` URLs and adds `target="_blank" rel="noopener noreferrer"`; `mailto:` / `tel:` get external treatment without a new tab; `/` and `#` stay internal via `next/link`.

### Path alias

`@/*` → `./src/*` (see [tsconfig.json](tsconfig.json)). Use it everywhere instead of relative paths.

### MDX

`@next/mdx` and related plugins are installed but `pageExtensions` in `next.config.mjs` is currently `['js', 'jsx', 'ts', 'tsx']` — MDX is not wired into routing. If you add MDX pages, you'll also need to update `pageExtensions` and configure the MDX plugin.

## Code style

Prettier config (`prettier.config.js`): single quotes, no semicolons, Tailwind class-ordering plugin. The codebase uses `let` for locals (including in components) rather than `const` — match that style.
