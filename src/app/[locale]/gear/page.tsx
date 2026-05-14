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
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

let gearCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Gear - Ali Cagatay',
    description:
      'Software, hardware, and tools Ali Cagatay uses day to day: 14-inch MacBook Pro (M1 Pro), Dell and HP external displays, VS Code, Docker, Figma, Sony WH-1000XM5 headphones, and a Kindle Paperwhite.',
  },
  tr: {
    title: 'Kullandıklarım - Ali Cagatay',
    description:
      'Ali Cagatay\'ın günlük olarak kullandığı yazılım, donanım ve araçlar: 14 inç MacBook Pro (M1 Pro), Dell ve HP harici monitörler, VS Code, Docker, Figma, Sony WH-1000XM5 kulaklık ve Kindle Paperwhite.',
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
    path: '/gear',
    title: gearCopy[typedLocale].title,
    description: gearCopy[typedLocale].description,
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
