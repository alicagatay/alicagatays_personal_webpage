import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from '@/app/providers'
import { JsonLd } from '@/components/JsonLd'
import { SuppressNextThemesScriptWarning } from '@/components/SuppressNextThemesScriptWarning'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getSiteUrl } from '@/lib/site-url'

import '@/styles/tailwind.css'

let siteUrl = getSiteUrl()

let title = 'Ali Cagatay - AI Engineer in Birmingham'
let description =
  'Ali Cagatay is an AI engineer in Birmingham specialising in deep learning, computer vision, agentic systems, and full-stack software engineering.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Ali Cagatay',
    default: title,
  },
  description,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Ali Cagatay',
    locale: 'en_GB',
    url: '/',
    title,
    description,
  },
  twitter: {
    card: 'summary',
    title,
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

let websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ali Cagatay',
  url: siteUrl,
  inLanguage: 'en-GB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-paper text-zinc-900 antialiased dark:bg-ink dark:text-zinc-100"
        suppressHydrationWarning
      >
        <SuppressNextThemesScriptWarning />
        <Providers>
          <ThemeToggle />
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
        <JsonLd id="schema-website" data={websiteSchema} />
      </body>
    </html>
  )
}
