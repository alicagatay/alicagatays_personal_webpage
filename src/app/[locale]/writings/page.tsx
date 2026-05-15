import { type Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import Link from '@/components/Link'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { getAllWritings } from '@/lib/writings'
import { routing, type Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  let { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  let typedLocale = locale as Locale
  let t = await getTranslations({
    locale: typedLocale,
    namespace: 'writings.meta',
  })
  return buildPageMetadata({
    locale: typedLocale,
    path: '/writings',
    title: t('title'),
    description: t('description'),
  })
}

function formatDate(dateString: string, locale: Locale) {
  return new Date(dateString).toLocaleDateString(
    locale === 'tr' ? 'tr-TR' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

export default async function Writings({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  let { locale } = await params
  let typedLocale = locale as Locale
  let t = await getTranslations({ locale: typedLocale, namespace: 'writings' })
  let writings = await getAllWritings()

  return (
    <SimpleLayout title={t('title')} intro={t('intro')}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {writings.map((writing) => (
            <article
              key={writing.slug}
              className="md:grid md:grid-cols-4 md:items-baseline"
            >
              <div className="md:col-span-3 group relative flex flex-col items-start">
                <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                  <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                  <span className="relative z-10">
                    {writing.frontmatter.title}
                  </span>
                </h2>
                <time
                  dateTime={writing.frontmatter.date}
                  className="md:hidden relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-500 dark:text-zinc-400"
                  aria-label={formatDate(writing.frontmatter.date, typedLocale)}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center">
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  </span>
                  {formatDate(writing.frontmatter.date, typedLocale)}
                </time>
                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {writing.frontmatter.description}
                </p>
                <Link
                  href={`/writings/${writing.slug}`}
                  className="relative z-20 mt-4 flex items-center text-sm font-medium text-teal-500 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  {t('readMore')}
                </Link>
              </div>
              <time
                dateTime={writing.frontmatter.date}
                className="mt-1 hidden text-sm text-zinc-500 dark:text-zinc-400 md:block"
              >
                {formatDate(writing.frontmatter.date, typedLocale)}
              </time>
            </article>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
