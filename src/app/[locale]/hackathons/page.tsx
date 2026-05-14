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
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{timePeriod}</Card.Eyebrow>
      <Card.Eyebrow decorate>{location}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

let hackathonsCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Hackathons - Ali Cagatay',
    description:
      'Hackathons Ali Cagatay has participated in, including the Microsoft Embrace Midlands Hackathon 2025 where his team built CouncilAgent - a voice AI assistant for Birmingham City Council - and finished 3rd out of fifteen university teams.',
  },
  tr: {
    title: 'Hackathonlar - Ali Cagatay',
    description:
      'Ali Cagatay\'ın katıldığı hackathonlar - aralarında, ekibinin Birmingham City Council için sesli yapay zekâ asistanı CouncilAgent\'ı geliştirip on beş üniversite takımı arasında üçüncü olduğu Microsoft Embrace Midlands Hackathon 2025 de var.',
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
  return buildPageMetadata({
    locale: typedLocale,
    path: '/hackathons',
    title: hackathonsCopy[typedLocale].title,
    description: hackathonsCopy[typedLocale].description,
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
