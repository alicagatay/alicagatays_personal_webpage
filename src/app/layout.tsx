import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Ali Cagatay',
    default: 'Ali Cagatay – Software Engineer & Machine Learning Developer',
  },
  description:
    'Hi, I’m Ali! I’m a software engineer building full‑stack products and intelligent systems.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let locale = await getLocale()

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <NextIntlClientProvider>
          <Providers>
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
            <Analytics />
            <SpeedInsights />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
