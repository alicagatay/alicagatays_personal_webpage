import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Providers } from '@/app/providers'
import { JsonLd } from '@/components/JsonLd'
import { Layout } from '@/components/Layout'
import { SuppressNextThemesScriptWarning } from '@/components/SuppressNextThemesScriptWarning'
import { routing, type Locale } from '@/i18n/routing'
import { getSiteUrl } from '@/lib/site-url'

import '@/styles/tailwind.css'

let siteUrl = getSiteUrl()

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
  let t = await getTranslations({ locale: typedLocale, namespace: 'siteMeta' })
  let titleDefault = t('titleDefault')
  let description = t('description')

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: t('titleTemplate'),
      default: titleDefault,
    },
    description,
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
      title: titleDefault,
      description,
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
      title: titleDefault,
      description,
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
