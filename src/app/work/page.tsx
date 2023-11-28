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
            description="As a Teaching Lead at CodeYourFuture, I am responsible for the delivery of the course
            content to the trainees on the Saturday classes. I also mentor the trainees and help them with their
            tech journey during the week."
            timePeriod="September 2020 - Present"
            location="Birmingham, United Kingdom"
            cta="Learn more about CodeYourFuture and the work they do"
          />
          <Appearance
            href="https://codeyourfuture.io/"
            title="Tech Lead"
            description="As a Tech Lead at the Product Team of CodeYourFuture, I was responsible for the development of an
            internal tool that would help the organisation manage the trainees and the volunteers. There, I partnered with
            a product team of 12 people, including developers, product owners, QA testers and scrum masters."
            timePeriod="March 2023 - July 2023"
            location="Birmingham, United Kingdom"
            cta="Learn more about CodeYourFuture and the work they do"
          />
        </SpeakingSection>
        <SpeakingSection title="Invitelecom">
          <Appearance
            href="#"
            title="Software Engineer Intern"
            description="In my time at Invitelecom as a Software Engineer Intern, I worked on the development
            of a Android game called 'Predict The Number' and published it on the Google Play Store in under a month."
            timePeriod="August 2018 - September 2018"
            location="Istanbul, Turkey"
            cta="Learn more about CodeYourFuture and the work they do"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
