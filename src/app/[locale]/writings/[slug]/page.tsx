import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { hasLocale } from 'next-intl'

import { Container } from '@/components/Container'
import { JsonLd } from '@/components/JsonLd'
import Link from '@/components/Link'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteUrl } from '@/lib/site-url'
import { getWriting, getWritingSlugs } from '@/lib/writings'
import { routing, type Locale } from '@/i18n/routing'

let siteUrl = getSiteUrl()

export async function generateStaticParams() {
  let slugs = await getWritingSlugs()
  let params: Array<{ locale: string; slug: string }> = []
  for (let locale of routing.locales) {
    for (let slug of slugs) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  let { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  let writing = await getWriting(slug)
  if (!writing) return {}

  let typedLocale = locale as Locale
  let base = buildPageMetadata({
    locale: typedLocale,
    path: `/writings/${slug}`,
    title: writing.frontmatter.title,
    description: writing.frontmatter.description,
    openGraphType: 'article',
  })

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: writing.frontmatter.date,
      authors: [writing.frontmatter.author ?? 'Ali Cagatay'],
    },
  }
}

function formatDate(dateString: string, locale: Locale) {
  return new Date(dateString).toLocaleDateString(
    locale === 'tr' ? 'tr-TR' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  let { locale, slug } = await params
  let typedLocale = locale as Locale
  let writing = await getWriting(slug)

  if (!writing) {
    notFound()
  }

  let blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: writing.frontmatter.title,
    description: writing.frontmatter.description,
    datePublished: writing.frontmatter.date,
    dateModified: writing.frontmatter.date,
    author: {
      '@type': 'Person',
      name: writing.frontmatter.author ?? 'Ali Cagatay',
      url: `${siteUrl}/${typedLocale}`,
    },
    image: `${siteUrl}/opengraph-image`,
    url: `${siteUrl}/${typedLocale}/writings/${slug}`,
    inLanguage: typedLocale === 'tr' ? 'tr-TR' : 'en-GB',
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <JsonLd id={`schema-blog-${slug}`} data={blogPostingSchema} />
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/writings"
            aria-label={
              typedLocale === 'tr' ? 'Yazılara dön' : 'Back to writings'
            }
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
            >
              <path
                d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {writing.frontmatter.title}
              </h1>
              <time
                dateTime={writing.frontmatter.date}
                className="order-first flex items-center text-base text-zinc-500 dark:text-zinc-400"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">
                  {formatDate(writing.frontmatter.date, typedLocale)}
                </span>
              </time>
            </header>
            <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
              <MDXRemote source={writing.content} />
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}
