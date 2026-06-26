import Link from '@/components/Link'
import { Column } from '@/components/Column'
import { Row } from '@/components/Row'
import { Entry } from '@/components/Entry'
import { LinkList, type LinkListItem } from '@/components/LinkList'
import { JsonLd } from '@/components/JsonLd'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteUrl } from '@/lib/site-url'
import { getAllWritings } from '@/lib/writings'

let siteUrl = getSiteUrl()

let metaDescription =
  'I am Ali Cagatay, an AI engineer in Birmingham specialising in deep learning, computer vision, agentic systems, and full-stack software engineering. I take research-grade AI from notebook to production.'

let calendarHref = 'https://calendar.app.google/kp9sapugpyAugvnQA'

export const metadata = buildPageMetadata({
  path: '/',
  description: metaDescription,
  openGraphType: 'profile',
})

let work = [
  {
    title: 'AI Engineering & Research Lead - Kollestee UK Global',
    meta: '2026 - now',
    href: 'https://kollestee.co.uk/',
    linkLabel: 'kollestee.co.uk',
    blurb:
      'Built Follicle Labeller, a cross-platform medical-imaging tool that replaced a licensed platform and tracks hair grafts through live surgical video.',
  },
  {
    title: 'AI & Data Analytics Software Engineer - ProBuild360',
    meta: '2025 - 2026',
    href: 'https://www.probuild360.co.uk/',
    linkLabel: 'probuild360.co.uk',
    blurb:
      "Refined the production AI models and built the company's cross-platform mobile app from its internal web tool.",
  },
  {
    title: 'Machine Learning Engineer Intern - Kollestee UK Global',
    meta: '2024 - 2025',
    href: 'https://kollestee.co.uk/',
    linkLabel: 'kollestee.co.uk',
    blurb:
      "Built ML models for 3D point-cloud processing and wired them into the company's robotics and core products.",
  },
  {
    title: 'Volunteer Software Engineering Mentor - CodeYourFuture',
    meta: '2020 - now',
    href: 'https://codeyourfuture.io/',
    linkLabel: 'codeyourfuture.io',
    blurb:
      'I teach JavaScript, Python and Git to career-changers and review their code, most Saturdays.',
  },
  {
    title: 'Software Engineer Intern - Invitelecom',
    meta: '2018',
    blurb:
      'Built and shipped an Android game to the Play Store in under a month.',
  },
]

let projects: LinkListItem[] = [
  {
    title: 'Board of Directors RAG',
    href: 'https://board-of-directors-rag.vercel.app/',
    secondary: {
      label: 'code',
      href: 'https://github.com/alicagatay/board-of-directors-rag',
    },
    blurb:
      "A multi-agent RAG over 484 creator transcripts - ask a question and get answers grounded in what they've actually said.",
  },
  {
    title: 'CouncilAgent',
    href: 'https://github.com/alicagatay/embrace-hackathon-challenge/',
    blurb:
      'A voice AI assistant for Birmingham City Council, built in 5 hours - 3rd of 15 teams at the Microsoft hackathon.',
  },
  {
    title: 'Micro Marketing Assistant',
    href: 'https://www.micro-marketing-assistant.com/',
    secondary: {
      label: 'code',
      href: 'https://github.com/alicagatay/micro-marketing-assistant',
    },
    blurb: 'A fast, minimal CRM for small businesses.',
  },
  {
    title: 'Focus Timer',
    href: 'https://focus-timer-sandy.vercel.app/',
    secondary: {
      label: 'code',
      href: 'https://github.com/alicagatay/focus-timer',
    },
    blurb: 'A clean Pomodoro timer for work and breaks.',
  },
]

let education = [
  {
    title: 'MSc Artificial Intelligence - Birmingham City University',
    meta: '2024 - 2026 · Distinction',
    href: 'https://www.bcu.ac.uk/',
    linkLabel: 'bcu.ac.uk',
    blurb:
      'Deep learning and applied AI, plus a dissertation on multimodal property-price prediction with ProBuild360.',
  },
  {
    title: 'BSc Computer Science - University of Birmingham',
    meta: '2019 - 2022',
    href: 'https://www.birmingham.ac.uk/',
    linkLabel: 'birmingham.ac.uk',
    blurb:
      'Software engineering, algorithms, and my first AI courses - machine learning, neural computation, computer vision.',
  },
]

let stack =
  'Python, TypeScript · PyTorch, TensorFlow, OpenCV · Next.js, React Native, FastAPI · Docker, PostgreSQL'

let social = [
  { label: 'GitHub', href: 'https://github.com/alicagatay' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alicagatay/' },
  { label: 'Instagram', href: 'https://www.instagram.com/_alicagatay/' },
  { label: 'Email', href: 'mailto:aliccagatay@gmail.com' },
]

let personSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Ali Cagatay',
    givenName: 'Ali',
    familyName: 'Cagatay',
    jobTitle: 'AI Engineer',
    description: metaDescription,
    image: `${siteUrl}/opengraph-image`,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Birmingham',
      addressCountry: 'GB',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Kollestee UK Global',
      url: 'https://kollestee.co.uk/',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Birmingham City University',
        url: 'https://www.bcu.ac.uk/',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of Birmingham',
        url: 'https://www.birmingham.ac.uk/',
      },
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Deep Learning',
      'Computer Vision',
      'Machine Learning',
      'Agentic Systems',
      'Full-stack Software Engineering',
      'Retrieval-Augmented Generation',
      'Multimodal AI',
    ],
    sameAs: [
      'https://github.com/alicagatay',
      'https://www.linkedin.com/in/alicagatay/',
      'https://www.instagram.com/_alicagatay/',
    ],
  },
}

let plainLink =
  'underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 hover:decoration-teal-700 dark:decoration-zinc-600 dark:hover:text-teal-400 dark:hover:decoration-teal-400'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
  })
}

export default async function Home() {
  let writings = (await getAllWritings()).slice(0, 3)

  let writingItems: LinkListItem[] = writings.map((writing) => ({
    title: writing.frontmatter.title,
    href: `/writings/${writing.slug}`,
    meta: formatDate(writing.frontmatter.date),
    blurb: writing.frontmatter.description,
  }))

  return (
    <main className="pb-32 pt-24 sm:pt-32">
      <JsonLd id="schema-person" data={personSchema} />
      <Column>
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ali Cagatay
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            AI Engineer · Software Builder · Founder
          </p>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            I build and ship products from scratch - from AI systems to
            full-stack software. I currently work as an AI Engineering &amp;
            Research Lead at Kollestee UK Global, where I lead research and
            development efforts and am building Follicle Labeller, a medical
            imaging and annotation tool used to detect hair follicles and grafts
            on the human scalp. Previously, I worked as a Software Engineer and
            Machine Learning Engineer across startups and mid-sized companies,
            while earning a BSc in Computer Science and an MSc in Artificial
            Intelligence. Outside of work, I build and ship my own tools that
            help me work much faster and more efficiently.
          </p>
        </header>

        <div className="mt-16 space-y-14 sm:mt-20">
          <Row label="Work" id="work">
            <div className="space-y-8">
              {work.map((entry) => (
                <Entry
                  key={entry.title}
                  title={entry.title}
                  meta={entry.meta}
                  href={entry.href}
                  linkLabel={entry.linkLabel}
                >
                  {entry.blurb}
                </Entry>
              ))}
            </div>
          </Row>

          <Row label="Projects" id="projects">
            <LinkList items={projects} />
          </Row>

          <Row label="Tech Stack">
            <p className="text-zinc-600 dark:text-zinc-400">{stack}</p>
          </Row>

          <Row label="Education" id="education">
            <div className="space-y-8">
              {education.map((entry) => (
                <Entry
                  key={entry.title}
                  title={entry.title}
                  meta={entry.meta}
                  href={entry.href}
                  linkLabel={entry.linkLabel}
                >
                  {entry.blurb}
                </Entry>
              ))}
            </div>
          </Row>

          <Row label="Writings">
            {writingItems.length > 0 ? (
              <LinkList items={writingItems} />
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">
                <Link href="/writings" className={plainLink}>
                  Occasional notes on AI, software engineering, product
                  building, founding, and more ↗
                </Link>
              </p>
            )}
          </Row>

          <Row label="Elsewhere">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-600 dark:text-zinc-400">
              {social.map((item, index) => (
                <span key={item.label} className="flex items-center gap-x-3">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="text-zinc-300 dark:text-zinc-600"
                    >
                      ·
                    </span>
                  ) : null}
                  <Link href={item.href} className={plainLink}>
                    {item.label}
                  </Link>
                </span>
              ))}
            </p>
          </Row>

          <Row label="Work with me" id="contact">
            <p className="text-zinc-600 dark:text-zinc-400">
              I take on focused builds - MVPs, AI features, and mobile or web
              apps. If that sounds like you, tell me a bit about the project and
              let&rsquo;s talk.
            </p>
            <Link
              href={calendarHref}
              className="mt-4 inline-flex items-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-paper dark:focus:ring-offset-ink"
            >
              Book a call ↗
            </Link>
          </Row>
        </div>
      </Column>
    </main>
  )
}
