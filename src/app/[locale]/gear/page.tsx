import { type Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { routing, type Locale } from '@/i18n/routing'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3">{title}</Card.Title>
      <Card.Description>{children}</Card.Description>
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
  let t = await getTranslations({ locale: typedLocale, namespace: 'gear.meta' })
  return buildPageMetadata({
    locale: typedLocale,
    path: '/gear',
    title: t('title'),
    description: t('description'),
  })
}

type GearTool = {
  title: string
  description: string
}

type GearSection = {
  title: string
  tools: GearTool[]
}

export default async function Uses() {
  let t = await getTranslations('gear')
  let sections = t.raw('sections') as GearSection[]

  return (
    <SimpleLayout title={t('title')} intro={t('intro')}>
      <div className="space-y-20">
        {sections.map((section) => (
          <ToolsSection key={section.title} title={section.title}>
            {section.tools.map((tool) => (
              <Tool key={`${section.title}-${tool.title}`} title={tool.title}>
                {tool.description}
              </Tool>
            ))}
          </ToolsSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
