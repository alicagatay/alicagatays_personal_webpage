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

let workCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Work - Ali Cagatay',
    description:
      'Work history of Ali Cagatay: AI Engineering & Research Lead at Kollestee UK Global, AI & Data Analytics Software Engineer Placement at ProBuild360, ML Engineer Intern at Kollestee, Volunteer Mentor at CodeYourFuture, and Software Engineer Intern at Invitelecom.',
  },
  tr: {
    title: 'İş Deneyimi - Ali Cagatay',
    description:
      'Ali Cagatay\'ın iş geçmişi: Kollestee UK Global\'da Yapay Zekâ Mühendisliği & Araştırma Lideri, ProBuild360\'ta Yapay Zekâ & Veri Analitiği Yazılım Mühendisi, Kollestee\'de Makine Öğrenmesi Mühendisi stajyeri, CodeYourFuture\'da gönüllü mentor ve Invitelecom\'da yazılım mühendisi stajyeri.',
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
    path: '/work',
    title: workCopy[typedLocale].title,
    description: workCopy[typedLocale].description,
  })
}

type WorkEntry = {
  href: string
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
}

export default async function Speaking() {
  let t = await getTranslations('work')
  let entries = t.raw('entries') as WorkEntry[]

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
