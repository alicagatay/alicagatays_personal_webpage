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
  title: 'Education History',
  description:
    'My complete education history, including my degrees, courses, and certifications.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="My complete education history"
      intro="This list includes all my degrees, courses, and certifications."
    >
      <div className="space-y-20">
        <SpeakingSection title="University Degrees">
          <Appearance
            href="https://www.bcu.ac.uk/"
            title="MSc Artificial Intelligence at the Birmingham City University"
            description="On September 2024, I will be starting my Masters degree in Artificial Intelligence at the Birmingham City University,
            to pursue my interest in Artificial Intelligence and Machine Learning even further. There, I will be studying a variaty of modules such
            as Computing for AI, Machine Learning, Applied AI, Deep Learning, Data Visualisation and Impact of AI. In addition, I will be completing
            my Individual Masters Project during my studies."
            timePeriod="September 2024 - Present"
            location="Birmingham, United Kingdom"
            cta="About Birmingham City University"
          />
          <Appearance
            href="https://www.birmingham.ac.uk/"
            title="BSc Computer Science at the University of Birmingham"
            description="During my Bachelors degree at the University of Birmingham, I have studied various modules about
            Computer Science in general, including Software Engineering, Data Structures & Algorithms and Mobile & Ubiquitous Computing.
            In addition, I have also taken introductory modules about Artificial Intelligence such as Machine Learning, Neural Computation and Computer Vision.
            During my time here, I have also built various projects in my modules, such as my final year dissertation project,
            where I have built a mobile application that uses Natural Language Processing and Neural Networks
            in it's backend that can recommend the user a workout depending on the body part they want to train.
            At the end of my degree on July 2022, I have achieved a 2:2 grade and graduated with an Honours.
            "
            timePeriod="September 2019 - July 2022"
            location="Birmingham, United Kingdom"
            cta="About the University of Birmingham"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
