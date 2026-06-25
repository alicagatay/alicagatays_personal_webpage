# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Ali Cagatay (alicagatay.xyz). Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS, deployed to Vercel. The site is **English-only** — there is no internationalization layer.

## Commands

```bash
npm run dev     # next dev — local server on http://localhost:3000
npm run build   # next build — production build
npm run start   # next start — serve the production build
npm run lint    # eslint . (flat config in eslint.config.mjs, extends eslint-config-next core-web-vitals)
```

No test runner is configured. Prettier runs via the `prettier` binary (`npx prettier --write .`); class ordering comes from `prettier-plugin-tailwindcss`.

`NEXT_PUBLIC_SITE_URL` is the only required env var (see `.env.example`); it feeds `getSiteUrl()` ([src/lib/site-url.ts](src/lib/site-url.ts)), which in turn feeds the metadata base, canonical URLs, sitemap, robots, RSS feed, and JSON-LD. The RSS `alternates` link is set in [src/app/layout.tsx](src/app/layout.tsx).

## Architecture

### Routing and layout

App Router under [src/app/](src/app). All user-facing routes live directly under [src/app/](src/app) — `/` (home), `/about`, `/projects`, `/education`, `/work`, `/hackathons`, `/gear`, `/writings`, `/writings/[slug]`, `/thank-you`, plus the legacy `/work-with-me-old-link-update-later`. There are no locale-prefixed URLs and no routing middleware.

The root [layout.tsx](src/app/layout.tsx) owns the `<html lang="en">` / `<body>` tags, exports a static `metadata` object (title template, default title, description, canonical, RSS alternate, OG/Twitter, robots), injects the `WebSite` JSON-LD, and wraps children in `Providers` (theme) → `Layout` (header/footer). No `generateStaticParams` / `params` plumbing is needed.

Files directly in `src/app/` also include the metadata file conventions and shared providers — `favicon.ico`, `feed.xml/route.ts`, `manifest.ts`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, `providers.tsx`.

Navigation links live in both [Header.tsx](src/components/Header.tsx) and [Footer.tsx](src/components/Footer.tsx) — keep them in sync when adding/removing pages. Both files hardcode the link labels.

### Where copy lives

Page copy is **inlined directly in each page/component** (string literals, or local `const` data arrays like `entries`/`sections`/`projects`). There are no `messages/*.json` files and no translation layer — what you read in the component is what renders. When editing copy, edit the component.

Each page is a Server Component. Most use the [`SimpleLayout`](src/components/SimpleLayout.tsx) shell (`title` + `intro` props) and render `Card`-based lists. `work` / `education` / `hackathons` share an identical `SpeakingSection` + `Appearance` structure; `gear` uses `ToolsSection` + `Tool`.

### Metadata

Each page exports `metadata` (or `generateMetadata` for the dynamic `writings/[slug]` route) built via [`buildPageMetadata`](src/lib/metadata.ts), passing `path`, `title?`, `description`, and optional `openGraphType`. The helper returns a `Metadata` object with canonical URL, OG, and Twitter card. Two behaviors worth knowing:

- The root layout sets `title: { template: '%s - Ali Cagatay', default: '<siteDefault>' }`, so a page-level `title: 'Projects'` renders as `<title>Projects - Ali Cagatay</title>`.
- The helper appends `- Ali Cagatay` to `og:title` / `twitter:title` itself (`og:title` doesn't go through the layout's title template, so the helper does it explicitly to keep social shares consistent with `<title>`).
- When `title` is omitted (the `buildPageMetadata` input accepts `title?: string`), no `<title>` / `og:title` / `twitter:title` is set at all and the layout's default title wins. The home page uses this.

`sitemap.ts`, `robots.ts`, and `feed.xml/route.ts` emit a single set of root-level URLs (no locale variants / hreflang).

### Theming

`next-themes` with `attribute="class"` and `darkMode: 'class'` in Tailwind. `ThemeWatcher` in [providers.tsx](src/app/providers.tsx) re-syncs to `"system"` when the OS preference matches the resolved theme so the toggle stays consistent across tabs.

### Link component

Always import `Link` from [@/components/Link](src/components/Link.tsx), **not** `next/link` directly. It auto-detects external `http(s)` URLs and adds `target="_blank" rel="noopener noreferrer"`; `mailto:` / `tel:` get external treatment without a new tab; `/` and `#` stay internal via `next/link`.

### Path alias

`@/*` → `./src/*` (see [tsconfig.json](tsconfig.json)). Use it everywhere instead of relative paths.

### MDX and writings

Writing posts are MDX files in [src/content/writings/](src/content/writings/) (currently empty after the seed-post cleanup). They're loaded by [src/lib/writings.ts](src/lib/writings.ts) — `fs.readdir` + `gray-matter` for frontmatter — and rendered by the `writings/[slug]` route via `next-mdx-remote/rsc`. Code blocks are syntax-highlighted at build time via `rehype-pretty-code` + `shiki`. Frontmatter shape (see `WritingFrontmatter`): `title`, `description`, `date`, optional `author`.

`pageExtensions` in [next.config.mjs](next.config.mjs) is `['ts', 'tsx', 'mdx']`, so `.mdx` files dropped into `src/app/` would also be routable — but today MDX is only used as the content source for writings, not for pages. [src/mdx-components.tsx](src/mdx-components.tsx) is the Next.js MDX customization hook.

## Code style

Prettier config (`prettier.config.js`): single quotes, no semicolons, Tailwind class-ordering plugin. The codebase uses `let` for locals (including in components) rather than `const` — match that style.
