import { type Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import Link from '@/components/Link'
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
    namespace: 'workWithMe.meta',
  })
  return buildPageMetadata({
    locale: typedLocale,
    path: '/work-with-me-old-link-update-later',
    title: t('title'),
    description: t('description'),
  })
}

export default async function WorkWithMe({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  let { locale } = await params
  let typedLocale = locale as Locale
  let t = await getTranslations({
    locale: typedLocale,
    namespace: 'workWithMe',
  })

  return (
    <SimpleLayout title={t('title')} intro={t('intro')}>
      <div className="flex justify-center">
        <Link
          href="https://calendar.app.google/kp9sapugpyAugvnQA"
          className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          {t('scheduleCta')}
        </Link>
      </div>
    </SimpleLayout>
  )
}
