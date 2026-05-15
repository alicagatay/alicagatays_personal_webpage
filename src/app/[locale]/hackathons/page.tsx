import { type Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { routing, type Locale } from '@/i18n/routing'

function SpeakingSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,
  timePeriod,
  location,
  cta,
  href,
}: {
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3">{title}</Card.Title>
      <Card.Eyebrow decorate>{timePeriod}</Card.Eyebrow>
      <Card.Eyebrow decorate>{location}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta href={href}>{cta}</Card.Cta>
    </Card>
  )
}

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
    namespace: 'hackathons.meta',
  })
  return buildPageMetadata({
    locale: typedLocale,
    path: '/hackathons',
    title: t('title'),
    description: t('description'),
  })
}

type HackathonEntry = {
  href: string
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
}

export default async function Speaking() {
  let t = await getTranslations('hackathons')
  let entries = t.raw('entries') as HackathonEntry[]

  return (
    <SimpleLayout title={t('title')} intro={t('intro')}>
      <div className="space-y-20">
        <SpeakingSection title={t('sectionTitle')}>
          {entries.map((entry) => (
            <Appearance
              key={entry.title}
              href={entry.href}
              title={entry.title}
              description={entry.description}
              timePeriod={entry.timePeriod}
              location={entry.location}
              cta={entry.cta}
            />
          ))}
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
