import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from 'rehype-pretty-code'

import { Column } from '@/components/Column'
import { JsonLd } from '@/components/JsonLd'
import Link from '@/components/Link'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteUrl } from '@/lib/site-url'
import { getWriting, getWritingSlugs } from '@/lib/writings'

let rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
}

let siteUrl = getSiteUrl()

export async function generateStaticParams() {
  let slugs = await getWritingSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  let { slug } = await params
  let writing = await getWriting(slug)
  if (!writing) return {}

  let base = buildPageMetadata({
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let { slug } = await params
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
      url: siteUrl,
    },
    image: `${siteUrl}/opengraph-image`,
    url: `${siteUrl}/writings/${slug}`,
    inLanguage: 'en-GB',
  }

  return (
    <main className="pt-24 pb-32 sm:pt-32">
      <JsonLd id={`schema-blog-${slug}`} data={blogPostingSchema} />
      <Column>
        <Link
          href="/writings"
          className="text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-teal-400"
        >
          ← Writing
        </Link>
        <article className="mt-10">
          <header className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {writing.frontmatter.title}
            </h1>
            <time
              dateTime={writing.frontmatter.date}
              className="order-first text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500"
            >
              {formatDate(writing.frontmatter.date)}
            </time>
          </header>
          <div className="prose-zinc prose mt-8 max-w-none dark:prose-invert">
            <MDXRemote
              source={writing.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
                },
              }}
            />
          </div>
        </article>
      </Column>
    </main>
  )
}
