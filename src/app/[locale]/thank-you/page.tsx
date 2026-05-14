import { type Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { routing, type Locale } from '@/i18n/routing'

let thankYouCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'You’re subscribed - Ali Cagatay',
    description: 'Thanks for subscribing to my newsletter.',
  },
  tr: {
    title: 'Aboneliğiniz tamamlandı - Ali Cagatay',
    description: 'Bültenime abone olduğunuz için teşekkürler.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  let { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  let typedLocale = locale as Locale
  let base = buildPageMetadata({
    locale: typedLocale,
    path: '/thank-you',
    title: thankYouCopy[typedLocale].title,
    description: thankYouCopy[typedLocale].description,
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
