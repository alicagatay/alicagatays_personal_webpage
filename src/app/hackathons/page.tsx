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
  title: 'Hackathon Participation History',
  description: 'The complete list of hackathons I have participated in.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="My complete hackathon history"
      intro="This list includes all of the hackathons I have participated in through time."
    >
      <div className="space-y-20">
        <SpeakingSection title="List of Hackathons">
          <Appearance
            href="https://github.com/alicagatay/embrace-hackathon-challenge/"
            title="Microsoft Embrace Midlands Hackathon"
            description="Participated in the Microsoft Embrace Midlands Hackathon 2025,
            where our 5-member team built an AI-powered voice assistant called CouncilAgent
            within just 5 hours. The system helps Birmingham residents access housing information
            by speaking naturally into a mobile app interface. I led the frontend and backend
            integration, using Flutter, FastAPI, Azure OpenAI, and Whisper for real-time
            voice interactions. Our solution earned 3rd place among fifteen university teams
            and was praised for its accessibility, scalability, and alignment with the UN
            Sustainable Development Goals."
            timePeriod="April 2025"
            location="Birmingham, United Kingdom"
            cta="Github repo of the project we built during the hackathon"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
