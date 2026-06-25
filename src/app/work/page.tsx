import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  path: '/work',
  title: 'Work',
  description:
    'Work history of Ali Cagatay: AI Engineering & Research Lead at Kollestee UK Global, AI & Data Analytics Software Engineer Placement at ProBuild360, ML Engineer Intern at Kollestee, Volunteer Mentor at CodeYourFuture, and Software Engineer Intern at Invitelecom.',
})

type WorkEntry = {
  href: string
  title: string
  description: string
  timePeriod: string
  location: string
  cta: string
}

const entries: WorkEntry[] = [
  {
    href: 'https://kollestee.co.uk/',
    title: 'AI Engineering & Research Lead at Kollestee UK Global',
    description:
      'Architected and developed Follicle Labeller, a cross-platform desktop and web medical imaging tool replacing a licensed third-party annotation platform and eliminating recurring licensing costs. Built an AI-assisted annotation and tracking system supporting 5 image formats and 3 annotation types, integrating YOLO11 detection and keypoint models to achieve 80%+ accuracy on 2K, 4K, and 8K clinical scalp imagery with live inference across 4 hardware backends. Engineered a real-time tracking pipeline following individual hair grafts through live surgical video feeds with 90%+ accuracy, combining template matching, multi-object tracking, and optical flow. Shipped the tool across Windows, macOS (Intel and Apple Silicon), and the browser from a single codebase with auto-update, CI/CD, and Dockerised inference backends. Drove applied research and rapid prototyping of new AI solutions for company products and robotic systems, working directly with the CTO and Product Owner.',
    timePeriod: 'March 2026 - Present',
    location: 'Birmingham, United Kingdom',
    cta: 'Learn more about Kollestee UK Global',
  },
  {
    href: 'https://www.probuild360.co.uk/',
    title: 'AI & Data Analytics Software Engineer Placement at ProBuild360',
    description:
      "Refined production AI models and deployed updated systems via GitHub Actions CI/CD pipelines, reducing inference errors by 10%, and integrated the company's AI systems into the mobile app via RESTful endpoints for 15% faster data retrieval. Built a cross-platform mobile application from an internal web business tool using React Native (Expo) and TypeScript for ~12 internal users, while enhancing and maintaining the existing Next.js and TypeScript web application to keep feature parity between platforms. Implemented automated Jest and React Native Testing Library suites with GitHub Actions CI/CD integration, reducing production bug reports by 12%. Collaborated within a 6-person Agile engineering team and conducted MSc dissertation research on AI system optimisation in partnership with ProBuild360, applying findings directly to production model improvements.",
    timePeriod: 'October 2025 - March 2026',
    location: 'Birmingham, United Kingdom',
    cta: 'Learn more about ProBuild360',
  },
  {
    href: 'https://kollestee.co.uk/',
    title: 'Machine Learning Engineer Intern at Kollestee UK Global',
    description:
      'Spearheaded research and development of machine learning models for 3D point cloud processing, delivering AI-driven solutions that increased key product innovations by 20%. Integrated machine learning algorithms into robotic systems and core products using Python, TensorFlow, LabelCloud, and Open3D, improving system performance by 15% and reducing development time by 25%. Engineered data processing pipelines for large-scale 3D and 2D datasets, increasing model accuracy by 10% and inference speed by 25%, enhancing automation and decision-making capabilities.',
    timePeriod: 'June 2024 - September 2025',
    location: 'Birmingham, United Kingdom',
    cta: 'Learn more about Kollestee UK Global',
  },
  {
    href: 'https://codeyourfuture.io/',
    title: 'Volunteer Software Engineering Mentor at CodeYourFuture',
    description:
      "Volunteer mentor and instructor supporting 6+ cohorts across all four modules of the Intro to Programming course, delivering sprint content, live coding, and Q&A as lead or co-lead of Saturday classes three out of four weeks a month. Mentor trainees one-to-one and in small groups on JavaScript, Python, Git and GitHub workflows, Jest testing, and SQL fundamentals, translating technical concepts into plain language for learners with no prior coding experience. Review trainee pull requests in class and asynchronously through the week, providing actionable code feedback that reinforces the flipped-classroom, project-based learning model. Part of the volunteer network supporting CYF's 70% graduate employment rate at companies including BBC, Capgemini, JP Morgan, Slack, NatWest, and the Financial Times.",
    timePeriod: 'September 2020 - Present',
    location: 'Birmingham, United Kingdom',
    cta: 'Learn more about CodeYourFuture and the work they do',
  },
  {
    href: '#',
    title: 'Software Engineer Intern at Invitelecom',
    description:
      "During my internship at Invitelecom, I worked on developing an Android game called 'Predict The Number' and published it on the Google Play Store in under a month.",
    timePeriod: 'August 2018 - September 2018',
    location: 'Istanbul, Turkey',
    cta: '',
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

export default function Work() {
  return (
    <SimpleLayout
      title="The history of all the companies I’ve been in and the projects I’ve worked on."
      intro="This list includes internships and volunteering work as well."
    >
      <div className="space-y-20">
        <SpeakingSection title="Professional Experience">
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
