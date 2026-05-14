import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Providers } from '@/app/providers'
import { JsonLd } from '@/components/JsonLd'
import { Layout } from '@/components/Layout'
import { SuppressNextThemesScriptWarning } from '@/components/SuppressNextThemesScriptWarning'
import { routing, type Locale } from '@/i18n/routing'
import { getSiteUrl } from '@/lib/site-url'

import '@/styles/tailwind.css'

let siteUrl = getSiteUrl()

let titleByLocale: Record<Locale, { template: string; default: string }> = {
  en: {
    template: '%s - Ali Cagatay',
    default: 'Ali Cagatay - AI Engineer in Birmingham',
  },
  tr: {
    template: '%s - Ali Cagatay',
    default: 'Ali Cagatay - Birmingham\'da Yapay Zekâ Mühendisi',
  },
}

let descriptionByLocale: Record<Locale, string> = {
  en: 'Ali Cagatay is an AI engineer in Birmingham specialising in deep learning, computer vision, agentic systems, and full-stack software engineering.',
  tr: 'Ali Cagatay, Birmingham\'da derin öğrenme, bilgisayarlı görü, agent tabanlı sistemler ve full-stack yazılım mühendisliği alanlarında uzmanlaşmış bir yapay zekâ mühendisidir.',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  let { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  let typedLocale = locale as Locale
  return {
    metadataBase: new URL(siteUrl),
    title: titleByLocale[typedLocale],
    description: descriptionByLocale[typedLocale],
    alternates: {
      canonical: `/${typedLocale}`,
      languages: {
        'en-GB': '/en',
        'tr-TR': '/tr',
        'x-default': '/en',
      },
      types: {
        'application/rss+xml': `${siteUrl}/feed.xml`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Ali Cagatay',
      locale: typedLocale === 'tr' ? 'tr_TR' : 'en_GB',
      url: `/${typedLocale}`,
      title: titleByLocale[typedLocale].default,
      description: descriptionByLocale[typedLocale],
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
      title: titleByLocale[typedLocale].default,
      description: descriptionByLocale[typedLocale],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  let { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  let websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ali Cagatay',
    url: siteUrl,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en-GB',
  }

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <body
        className="flex h-full bg-zinc-50 dark:bg-black"
        suppressHydrationWarning
      >
        <SuppressNextThemesScriptWarning />
        <NextIntlClientProvider>
          <Providers>
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
            <Analytics />
            <SpeedInsights />
          </Providers>
        </NextIntlClientProvider>
        <JsonLd id="schema-website" data={websiteSchema} />
      </body>
    </html>
  )
}
