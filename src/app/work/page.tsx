import { type Metadata } from 'next'

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
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
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

export default function Speaking() {
  return (
    <SimpleLayout
      title="The history of all the companies I’ve been in and the projects I’ve worked on."
      intro="This list includes internships and volunteering work as well."
    >
      <div className="space-y-20">
        <SpeakingSection title="CodeYourFuture">
          <Appearance
            href="https://codeyourfuture.io/"
            title="Teaching Lead"
            description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
            event="September 2020 - Present"
            cta="Learn more about CodeYourFuture and the work they do"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
