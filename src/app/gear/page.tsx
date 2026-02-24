import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getTranslations } from 'next-intl/server'

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

export const metadata = {
  title: 'My Gear',
  description: 'Software I use, gadgets I love, and other things I recommend.',
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
