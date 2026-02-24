import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
}

export default async function ThankYou() {
  let t = await getTranslations('thankYou')

  return <SimpleLayout title={t('title')} intro={t('intro')} />
}
