import { type Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'
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
    namespace: 'thankYou.meta',
  })
  let base = buildPageMetadata({
    locale: typedLocale,
    path: '/thank-you',
    title: t('title'),
    description: t('description'),
  })
  return {
    ...base,
    robots: { index: false, follow: false },
  }
}

export default async function ThankYou() {
  let t = await getTranslations('thankYou')

  return <SimpleLayout title={t('title')} intro={t('intro')} />
}
