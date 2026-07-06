# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Ali Cagatay (alicagatay.xyz). Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS, deployed to Vercel. The site is **English-only** - there is no internationalization layer.

The site is a **single, radically minimalist landing page**: one narrow centered column on a warm cream / ink background, tiny uppercase `LABEL → value` rows, generous whitespace, and no cards/shadows/carousel/avatar/nav. The only separate sub-tree is the `/writings` blog. Stay inside this minimalist frame when editing - don't reintroduce cards, carousels, or heavy navigation.

The site also serves **no images at all** (removed 2026-07): no favicon, no OG/social-share image, no manifest icons, no `image` in the JSON-LD, no photos anywhere. Inline SVG UI (the contribution heatmap, the theme-toggle glyphs) is fine - the ban is on image assets and image responses, not vector UI. Don't reintroduce any image surface without the owner asking.

## Commands

```bash
npm run dev     # next dev - local server on http://localhost:3000
npm run build   # next build - production build
npm run start   # next start - serve the production build
npm run lint    # eslint . (flat config in eslint.config.mjs, extends eslint-config-next core-web-vitals)
```

No test runner is configured. Prettier runs via the `prettier` binary (`npx prettier --write .`); class ordering comes from `prettier-plugin-tailwindcss`.

`NEXT_PUBLIC_SITE_URL` is the only env var required to build and render (see `.env.example`); it feeds `getSiteUrl()` ([src/lib/site-url.ts](src/lib/site-url.ts)), which in turn feeds the metadata base, canonical URLs, sitemap, robots, RSS feed, and JSON-LD. The RSS `alternates` link is set in [src/app/layout.tsx](src/app/layout.tsx). The "Work with me" enquiry form additionally needs `RESEND_API_KEY` to actually send mail, and optionally `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` to rate-limit it (see the contact form notes below); both degrade gracefully when unset. The GitHub row's heatmap is token-free (it reads the public profile page); `GITHUB_TOKEN` (classic PAT, `repo` + `read:user`) is optional and only serves as a fallback data source (see the GitHub activity notes below).

## Architecture

### Routing

App Router under [src/app/](src/app). There are only **two public surfaces**:

- `/` - the home page ([src/app/page.tsx](src/app/page.tsx)) **is the entire site**: a stack of `LABEL → value` rows (intro, GitHub, Work, Projects, Education, Writing, Elsewhere, and a "Work with me" CTA row). Rows carry `id` anchors (`#github`, `#work`, `#projects`, `#education`, `#contact`).
- `/writings` and `/writings/[slug]` - the blog index and post template.

Plus `/thank-you` (a `noindex` newsletter utility page) and the metadata-file conventions in `src/app/`: `feed.xml/route.ts`, `manifest.ts`, `robots.ts`, `sitemap.ts`, `providers.tsx`, `not-found.tsx`. There is deliberately **no** `favicon.ico` and **no** `opengraph-image.tsx` (see the no-images policy above); `/favicon.ico` 404s by design.

The redesign collapsed the old multi-page site (`/about`, `/work`, `/projects`, `/education`, `/hackathons`, `/gear`, `/work-with-me`). Those routes no longer exist; they are **301-redirected** to `/` (or the relevant anchor) via `redirects()` in [next.config.mjs](next.config.mjs), which also 301s the old bilingual `/en/*` and `/tr/*` URLs that Google still has indexed. When you cut or rename a route, add a redirect there too.

### Layout

The root [layout.tsx](src/app/layout.tsx) owns `<html lang="en">` / `<body class="bg-paper dark:bg-ink …">`, exports a static `metadata` object (title template, default title, description, canonical, RSS alternate, OG/Twitter, robots), injects the `WebSite` JSON-LD, and renders `Providers` (theme) → a corner [`ThemeToggle`](src/components/ThemeToggle.tsx) → `children` → Vercel `Analytics` + `SpeedInsights`. There is **no** Header/Footer/Layout wrapper and no navigation - the single page needs none.

### Components and the design system

A handful of small primitives in [src/components/](src/components) build every page:

- [`Column`](src/components/Column.tsx) - the shared `mx-auto max-w-[640px] px-6` reading column.
- [`Row`](src/components/Row.tsx) - a `LABEL → value` definition row: tiny uppercase label in a fixed left column on desktop, stacking above the value on mobile.
- [`Entry`](src/components/Entry.tsx) - a detailed work / education / recognition item (title + right-aligned meta + tightened blurb + optional external link).
- [`LinkList`](src/components/LinkList.tsx) - a scannable "title → blurb" list used for projects and writing (title links out; optional secondary link like `code`).
- [`ThemeToggle`](src/components/ThemeToggle.tsx) - the theme toggle, pinned top-right.
- [`ContributionGraph`](src/components/ContributionGraph.tsx) - server-rendered SVG heatmap of the last year of GitHub contributions.
- [`ContributionTooltip`](src/components/ContributionTooltip.tsx) - tiny client leaf wrapping the heatmap **and its legend**: delegates hover on any `data-tooltip` attribute to one fixed-position pill, immune to the scroll container's clipping ("N contributions on date" for day cells, the daily-count range each colour covers for legend swatches).
- [`JsonLd`](src/components/JsonLd.tsx) - injects schema.org JSON-LD via `useServerInsertedHTML` (outside the React tree, so crawlers see it in the initial HTML and React 19's script-tag warning never fires). Use it for any structured data instead of an inline `<script>`.
- [`SuppressNextThemesScriptWarning`](src/components/SuppressNextThemesScriptWarning.tsx) - dev-only console filter for the false-positive React 19 warning triggered by next-themes' intentional inline theme script.

Visual system: warm cream `paper` (`#f4f3ee`) light / warm `ink` (`#16150f`) dark, set as `theme.extend.colors` in [tailwind.config.ts](tailwind.config.ts) (which keeps `darkMode: 'class'`, the custom `fontSize` scale, and the typography plugin; prose styles for writings come from [typography.ts](typography.ts) at the repo root). Text is two-tone (`zinc-900`/`zinc-100` primary, `zinc-500`/`zinc-400` secondary); labels are `text-xs uppercase tracking-[0.18em]`. **Teal** (`teal-700` light / `teal-400` dark) is the single accent, reserved for the contact form's submit CTA and link-hover underlines.

### Where copy lives

Page copy is **inlined directly in each page** - there are no `messages/*.json` files and no translation layer. The home page's content lives in typed local arrays at the top of [src/app/page.tsx](src/app/page.tsx) (`work`, `projects`, `education`, `social`); adding or editing content means editing those arrays (or adding a new `Row`).

A standing constraint on the work copy: the intro and the employer entries deliberately describe the **kind** of work, never specific products, deployment contexts, industry sectors, or company capabilities - employers' projects are confidential. Employer names, titles, and dates are fine; so are personal projects and academic work. Keep new copy (and `llms.txt`, and commit messages touching copy) at that altitude. Every page is a Server Component; the home and `/writings` pages are `async` because they read writings via `getAllWritings()`. The exception is the "Work with me" row, which renders the client [`ContactForm`](src/components/ContactForm.tsx) (see below).

Typography: all **visible rendered prose** uses real curly apostrophes typed as literal `’` characters (never `&rsquo;` entities or straight `'`) - contractions, possessives, and quoted names like the ‘Predict The Number’ game title; `public/llms.txt` follows the same convention. Code comments and non-rendered strings stay ASCII.

### Contact form

The "Work with me" row's CTA is an in-page enquiry form (it replaced the old "Book a call" calendar link). The client [`ContactForm`](src/components/ContactForm.tsx) collects Name / Surname / Email / Reason / message and posts to the `submitEnquiry` **Server Action** in [src/lib/contact.ts](src/lib/contact.ts), which validates server-side (presence, an allow-listed `reason`, length caps, a basic email shape) and sends the enquiry via the **Resend** SDK to the owner's inbox, with `replyTo` set to the sender. Abuse controls layer up: a `display:none` honeypot (`company` field), the server-side length caps, and an optional per-IP + global-daily rate limit in [src/lib/rate-limit.ts](src/lib/rate-limit.ts) (Upstash Redis). Resend and Upstash both **degrade gracefully when their env vars are unset** - the form still renders and validates, it just can't send (shows a friendly "email me directly" message) or isn't throttled. `submitEnquiry` returns a `ContactState` that the form reflects as an inline error or a success confirmation (with a "Send another enquiry" reset). Keep the form inside the minimalist frame: underline-style fields, the teal submit button, no card.

### GitHub activity

The GitHub section (first section on the home page, `id="github"`) renders a contribution heatmap ([`ContributionGraph`](src/components/ContributionGraph.tsx), a zero-JS server-rendered SVG). It deliberately breaks the `Row` pattern: **no label** - a plain `<section>` spanning the column, with the SVG rendered at a fixed intrinsic size larger than the column (16px cells, ~1100px wide) inside an rtl `overflow-x-auto` container, so it scrolls horizontally at every viewport and opens on the most recent weeks. Data comes from `getContributionCalendar()` in [src/lib/github.ts](src/lib/github.ts), tiered for **profile parity**: the primary source is GitHub's public profile fragment `github.com/users/{user}/contributions` - it matches the profile exactly, including anonymized private counts and contributions in orgs that block API tokens, which the GraphQL API undercounts; GraphQL with the optional `GITHUB_TOKEN` and the jogruber proxy are fallback tiers (the profile markup is unofficial, so it's parsed strictly and any surprise falls through). Wrapped in `unstable_cache(..., { revalidate: 3600 })`, and the page exports `revalidate = 3600` - the site's first ISR usage; the home page re-renders hourly. Colour levels: cells use a **10-step teal ramp (empty + 9 intensities) bucketed in `ContributionGraph` from daily counts, log-scaled against the year's busiest day** - GitHub's own 0-4 quartile level saturates (a 52- and a 667-contribution day both hit level 4), so since 2026-07 it is still parsed/stored by `github.ts` but deliberately no longer drives the colours; don't switch the buckets to percentiles either (heavy-tailed years re-merge the top days). Hovering a legend swatch shows the daily-count range that colour covers: `buildLegendLabels` inverts the bucketing by binary-searching `levelFor`'s monotonic boundaries (never a count-by-count walk - the fallback data tiers aren't range-validated, so one absurd count could spin the render); on a quiet year, swatches whose bucket contains no attainable count get no tooltip. Degrades gracefully: all tiers failing → the row keeps its `#github` anchor and shows a profile link. A rotating latest-activity ticker shipped briefly alongside the heatmap but was **deliberately removed** (2026-07): the events API cannot see activity in orgs that block classic PATs, so the feed misrepresented the owner's actual activity - don't re-add it.

### Metadata

Each page exports `metadata` (or `generateMetadata` for the dynamic `writings/[slug]` route) built via [`buildPageMetadata`](src/lib/metadata.ts), passing `path`, `title?`, `description`, and optional `openGraphType`. The helper returns a `Metadata` object with canonical URL, OG, and Twitter card. Per the no-images policy, neither the helper nor the root layout sets `og:image` / `twitter:image`, and the Twitter card type is `summary` (text-only) - social shares intentionally have no preview image. Two behaviors worth knowing:

- The root layout sets `title: { template: '%s - Ali Cagatay', default: '<siteDefault>' }`, so a page-level `title: 'Writings'` renders as `<title>Writings - Ali Cagatay</title>`.
- The helper appends `- Ali Cagatay` to `og:title` / `twitter:title` itself (`og:title` doesn't go through the layout's title template, so the helper does it explicitly to keep social shares consistent with `<title>`).
- When `title` is omitted (the input accepts `title?: string`), no `<title>` / `og:title` / `twitter:title` is set and the layout's default title wins. The home page uses this.

The home page also injects an expanded `Person` (`ProfilePage`) JSON-LD - `worksFor`, `alumniOf`, `knowsAbout`, `sameAs` - which is the SEO insurance that carries keywords the sparse visible page no longer spells out. `sitemap.ts` now emits only `/` and `/writings` (+ per-post URLs); `robots.ts` and `feed.xml/route.ts` are unchanged (RSS is writings-only). Note: location (Birmingham) is intentionally kept in the JSON-LD/meta for discovery but is **not** shown on the visible page.

[public/llms.txt](public/llms.txt) is a hand-maintained machine-facing index for AI crawlers (per the llms.txt convention). It mirrors the home page's facts - roles, projects, education, the single-page anchor URLs - so **update it whenever the `page.tsx` content arrays or the route structure change**; it is static and silently went stale through the 2026-06 redesign once. Like the JSON-LD, it keeps the Birmingham location for discovery even though the visible page doesn't show it.

### Theming

`next-themes` with `attribute="class"` and `darkMode: 'class'` in Tailwind. `ThemeWatcher` in [providers.tsx](src/app/providers.tsx) re-syncs to `"system"` when the OS preference matches the resolved theme so the toggle stays consistent across tabs. The actual toggle button is [`ThemeToggle`](src/components/ThemeToggle.tsx), mounted once in the root layout.

### Link component

Always import `Link` from [@/components/Link](src/components/Link.tsx), **not** `next/link` directly. It auto-detects external `http(s)` URLs and adds `target="_blank" rel="noopener noreferrer"`; `mailto:` / `tel:` get external treatment without a new tab; `/` and `#` stay internal via `next/link`.

### Path alias

`@/*` → `./src/*` (see [tsconfig.json](tsconfig.json)). Use it everywhere instead of relative paths.

### MDX and writings

Writing posts are MDX files in [src/content/writings/](src/content/writings/) (currently empty). They're loaded by [src/lib/writings.ts](src/lib/writings.ts) - `fs.readdir` + `gray-matter` for frontmatter - and rendered by the `writings/[slug]` route via `next-mdx-remote/rsc`, inside the shared cream `Column`. Code blocks are syntax-highlighted at build time via `rehype-pretty-code` + `shiki`. Frontmatter shape (see `WritingFrontmatter`): `title`, `description`, `date`, optional `author`. The home page's "Writing" row lists the latest three posts when they exist (otherwise a single link to `/writings`).

`pageExtensions` in [next.config.mjs](next.config.mjs) is `['ts', 'tsx']`; MDX is used only as the content source for writings, not as routable pages. There is no `mdx-components.tsx` - component overrides, if ever needed, go through `MDXRemote`'s `components` prop in the `writings/[slug]` route.

## Code style

Prettier config (`prettier.config.js`): single quotes, no semicolons, Tailwind class-ordering plugin. The codebase uses `let` for locals (including in components) rather than `const` - match that style. The one exception: Next.js exports that must be statically analyzable (`export const metadata`, `export const revalidate`, and other segment config) stay `const`.
