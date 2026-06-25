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
      ...(brandedTitle ? { title: brandedTitle } : {}),
      description,
      images: ['/opengraph-image'],
    },
  }
}
