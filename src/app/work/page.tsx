import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

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

export const metadata: Metadata = {
  title: 'Work History',
  description:
    'The history of all the companies I’ve been in and the projects I’ve worked on. Includes internships and volunteering work as well.',
}

type WorkAppearance = {
  href: string
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
}

type WorkSection = {
  title: string
  appearances: WorkAppearance[]
}

export default async function Speaking() {
  let t = await getTranslations('work')
  let sections = t.raw('sections') as WorkSection[]

  return (
    <SimpleLayout title={t('title')} intro={t('intro')}>
      <div className="space-y-20">
        {sections.map((section) => (
          <SpeakingSection key={section.title} title={section.title}>
            {section.appearances.map((appearance) => (
              <Appearance
                key={`${section.title}-${appearance.title}`}
                href={appearance.href}
                title={appearance.title}
                description={appearance.description}
                timePeriod={appearance.timePeriod}
                location={appearance.location}
                cta={appearance.cta}
              />
            ))}
          </SpeakingSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
