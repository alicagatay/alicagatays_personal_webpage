import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  path: '/education',
  title: 'Education',
  description:
    'Education history of Ali Cagatay: MSc Artificial Intelligence (Distinction track) at Birmingham City University and BSc Computer Science at the University of Birmingham, with dissertation on multimodal deep learning for property price prediction.',
})

type EducationEntry = {
  href: string
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
}

const entries: EducationEntry[] = [
  {
    href: 'https://www.bcu.ac.uk/',
    title:
      'MSc Artificial Intelligence with Professional Placement at Birmingham City University',
    description:
      'I am currently pursuing an MSc degree in Artificial Intelligence at Birmingham City University to pursue my passion for Artificial Intelligence and Machine Learning. As part of the programme, I am exploring a variety of modules including Computing for AI, Machine Learning, Applied AI, Deep Learning, Data Visualisation, and the Impact of AI. My dissertation, undertaken in collaboration with ProBuild360, is titled "Enhancing Property Price Prediction with Geo-Spatial and Temporal Data: A Multimodal Deep Learning Study of the Birmingham Housing Market." I am currently on track to graduate from this degree with a distinction.',
    timePeriod: 'September 2024 - Present',
    location: 'Birmingham, United Kingdom',
    cta: 'About Birmingham City University',
  },
  {
    href: 'https://www.birmingham.ac.uk/',
    title: 'BSc Computer Science at the University of Birmingham',
    description:
      'During my Bachelor’s degree at the University of Birmingham, I studied various modules in Computer Science, including Software Engineering, Data Structures & Algorithms, and Mobile & Ubiquitous Computing. In addition, I took introductory Artificial Intelligence modules such as Machine Learning, Neural Computation, and Computer Vision. During my studies, I built multiple projects, including my final-year dissertation project: a mobile application that uses Natural Language Processing and Neural Networks in its backend to recommend workouts based on the body part the user wants to train. I graduated in July 2022 with a 2:2 Honours degree.',
    timePeriod: 'September 2019 - July 2022',
    location: 'Birmingham, United Kingdom',
    cta: 'About the University of Birmingham',
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

export default function Education() {
  return (
    <SimpleLayout
      title="My complete education history"
      intro="This list includes all my degrees, courses, and certifications."
    >
      <div className="space-y-20">
        <SpeakingSection title="University Degrees">
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
