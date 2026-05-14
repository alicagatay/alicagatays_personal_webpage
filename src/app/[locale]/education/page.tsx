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

let educationCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Education - Ali Cagatay',
    description:
      'Education history of Ali Cagatay: MSc Artificial Intelligence (Distinction track) at Birmingham City University and BSc Computer Science at the University of Birmingham, with dissertation on multimodal deep learning for property price prediction.',
  },
  tr: {
    title: 'Eğitim - Ali Cagatay',
    description:
      'Ali Cagatay\'ın eğitim geçmişi: Birmingham City University\'de Yapay Zekâ yüksek lisansı (Distinction yolunda) ve Birmingham Üniversitesi\'nde Bilgisayar Bilimi lisansı. Bitirme tezi: mülk fiyat tahmini için multimodal derin öğrenme.',
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
    path: '/education',
    title: educationCopy[typedLocale].title,
    description: educationCopy[typedLocale].description,
  })
}

type EducationEntry = {
  href: string
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
}

export default async function Speaking() {
  let t = await getTranslations('education')
  let entries = t.raw('entries') as EducationEntry[]

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
