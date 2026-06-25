import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  path: '/hackathons',
  title: 'Hackathons',
  description:
    'Hackathons Ali Cagatay has participated in, including the Microsoft Embrace Midlands Hackathon 2025 where his team built CouncilAgent - a voice AI assistant for Birmingham City Council - and finished 3rd out of fifteen university teams.',
})

type HackathonEntry = {
  href: string
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
}

const entries: HackathonEntry[] = [
  {
    href: 'https://github.com/alicagatay/embrace-hackathon-challenge/',
    title: 'Microsoft Embrace Midlands Hackathon',
    description:
      'I participated in the Microsoft Embrace Midlands Hackathon 2025, where our 5-member team built an AI-powered voice assistant called CouncilAgent within just 5 hours. The system helps Birmingham residents access housing information by speaking naturally into a mobile app interface. I led frontend/backend integration using Flutter, FastAPI, Azure OpenAI, and Whisper for real-time voice interactions. Our solution earned 3rd place among fifteen university teams and was praised for accessibility, scalability, and alignment with the UN Sustainable Development Goals.',
    timePeriod: 'April 2025',
    location: 'Birmingham, United Kingdom',
    cta: 'GitHub repo of the project we built during the hackathon',
  },
]

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

export default function Hackathons() {
  return (
    <SimpleLayout
      title="My complete hackathon history"
      intro="This list includes all of the hackathons I have participated in through time."
    >
      <div className="space-y-20">
        <SpeakingSection title="List of Hackathons">
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
