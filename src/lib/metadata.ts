import type { Metadata } from 'next'

import { locales, type Locale } from '@/i18n/routing'

export type PageMetaInput = {
  locale: Locale
  path: string
  title: string
  description: string
  openGraphType?: 'website' | 'article' | 'profile'
}

function buildAlternates(path: string) {
  let normalised = path === '/' ? '' : path
  let languages: Record<string, string> = {}
  for (let locale of locales) {
    languages[locale === 'en' ? 'en-GB' : 'tr-TR'] = `/${locale}${normalised}`
  }
  languages['x-default'] = `/en${normalised}`
  return { languages }
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  openGraphType = 'website',
}: PageMetaInput): Metadata {
  let normalised = path === '/' ? '' : path
  let canonical = `/${locale}${normalised}`
  let alternates = buildAlternates(path)

  return {
    title,
    description,
    alternates: {
      canonical,
      ...alternates,
    },
    openGraph: {
      type: openGraphType,
      title,
      description,
      url: canonical,
      siteName: 'Ali Cagatay',
      locale: locale === 'tr' ? 'tr_TR' : 'en_GB',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Ali Cagatay - AI Engineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  }
}
