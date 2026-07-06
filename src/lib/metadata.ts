import type { Metadata } from 'next'

export type PageMetaInput = {
  path: string
  title?: string
  description: string
  openGraphType?: 'website' | 'article' | 'profile'
}

export function buildPageMetadata({
  path,
  title,
  description,
  openGraphType = 'website',
}: PageMetaInput): Metadata {
  let canonical = path === '/' ? '/' : path
  let brandedTitle = title ? `${title} - Ali Cagatay` : undefined

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: openGraphType,
      ...(brandedTitle ? { title: brandedTitle } : {}),
      description,
      url: canonical,
      siteName: 'Ali Cagatay',
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary',
      ...(brandedTitle ? { title: brandedTitle } : {}),
      description,
    },
  }
}
