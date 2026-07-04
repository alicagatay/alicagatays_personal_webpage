import Link from '@/components/Link'
import { Column } from '@/components/Column'
import { Row } from '@/components/Row'
import { Entry } from '@/components/Entry'
import { LinkList, type LinkListItem } from '@/components/LinkList'
import { ContactForm } from '@/components/ContactForm'
import { ContributionGraph } from '@/components/ContributionGraph'
import { JsonLd } from '@/components/JsonLd'
import { buildPageMetadata } from '@/lib/metadata'
import { getContributionCalendar, githubProfileUrl } from '@/lib/github'
import { getSiteUrl } from '@/lib/site-url'
import { getAllWritings } from '@/lib/writings'

// Segment config must be a statically analyzable const literal (an exception
// to the repo's `let` style). Re-renders the page hourly for the GitHub data.
export const revalidate = 3600

let siteUrl = getSiteUrl()

let metaDescription =
  'I am Ali Cagatay, an AI engineer in Birmingham specialising in deep learning, computer vision, agentic systems, and full-stack software engineering. I take research-grade AI from notebook to production.'

export const metadata = buildPageMetadata({
  path: '/',
  description: metaDescription,
  openGraphType: 'profile',
})

let work = [
  {
    title: 'AI Engineering & Research Lead - Kollestee UK Global',
    meta: 'Mar 2026 - now',
    href: 'https://kollestee.co.uk/',
    linkLabel: 'kollestee.co.uk',
    blurb:
      "Leading the company's applied AI research and engineering - carrying new ideas from first experiments through to products in real use. Most of what we build is confidential; all of it is research that has to hold up in production.",
  },
  {
    title: 'AI & Data Analytics Software Engineer - ProBuild360',
    meta: 'Oct 2025 - Mar 2026',
    href: 'https://www.probuild360.co.uk/',
    linkLabel: 'probuild360.co.uk',
    blurb:
      'Built software and machine-learning systems the company runs on day to day - internal products, data pipelines, and the models behind them.',
  },
  {
    title: 'Machine Learning Engineer Intern - Kollestee UK Global',
    meta: 'Jun 2024 - Sep 2025',
    href: 'https://kollestee.co.uk/',
    linkLabel: 'kollestee.co.uk',
    blurb:
      "Researched and built machine-learning models for the company's core products, and engineered the data pipelines that fed them.",
  },
  {
    title: 'Volunteer Software Engineering Mentor - CodeYourFuture',
    meta: 'Sep 2020 - now',
    href: 'https://codeyourfuture.io/',
    linkLabel: 'codeyourfuture.io',
    blurb:
      'I lead and co-lead Saturday classes on the Intro to Programming course, teaching JavaScript, Python, Git, Jest and SQL to career-changers with no coding background, and reviewing their code in class and through the week.',
  },
  {
    title: 'Software Engineer Intern - Invitelecom',
    meta: 'Aug 2018 - Sep 2018',
    blurb:
      "Built and shipped an Android game, 'Predict The Number', to the Play Store in under a month.",
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
      "A multi-agent RAG over 484 YouTube transcripts from 18 creators - it routes each question to the right creator's persona and answers in their voice, grounded in what they've actually said.",
  },
  {
    title: 'CouncilAgent',
    href: 'https://github.com/alicagatay/embrace-hackathon-challenge/',
    blurb:
      'A voice AI assistant for Birmingham City Council that answers housing questions out loud - a Flutter app over an Azure OpenAI and Whisper backend, built in 5 hours with a 5-person team and placed 3rd of 15 at the Microsoft hackathon.',
  },
  {
    title: 'Micro Marketing Assistant',
    href: 'https://www.micro-marketing-assistant.com/',
    secondary: {
      label: 'code',
      href: 'https://github.com/alicagatay/micro-marketing-assistant',
    },
    blurb:
      "A fast, minimal CRM that helps small businesses track the products they're selling and who they're selling them to.",
  },
  {
    title: 'Focus Timer',
    href: 'https://focus-timer-sandy.vercel.app/',
    secondary: {
      label: 'code',
      href: 'https://github.com/alicagatay/focus-timer',
    },
    blurb:
      'A clean, no-frills Pomodoro timer for timing work and break sessions.',
  },
]

let education = [
  {
    title:
      'MSc Artificial Intelligence with Professional Placement - Birmingham City University',
    meta: 'Sep 2024 - Mar 2026',
    href: 'https://www.bcu.ac.uk/',
    linkLabel: 'bcu.ac.uk',
    blurb:
      "I did my MSc to go deeper into AI after the field really clicked for me, spending the year on machine learning, deep learning, applied AI, data visualisation and the wider impact of AI. The professional-placement part put me inside ProBuild360 as an AI engineer, doing the real job alongside the coursework. For my dissertation I built a multimodal deep-learning model that predicts property prices across the Birmingham housing market by fusing geospatial and temporal data. It's where most of my deep-learning and applied-AI foundations come from, and I finished with a Distinction.",
  },
  {
    title: 'BSc Computer Science - University of Birmingham',
    meta: 'Sep 2019 - Jul 2022',
    href: 'https://www.birmingham.ac.uk/',
    linkLabel: 'birmingham.ac.uk',
    blurb:
      'My BSc came out of loving to build things since I was a kid, and it gave me my core software-engineering foundations - data structures and algorithms, software engineering, and mobile and ubiquitous computing. It was also my first real taste of AI, through modules in machine learning, neural computation and computer vision, and projects like a computer-vision model that classifies brain scans for tumour detection. My final-year project brought the two together: a mobile app that uses NLP and neural networks to recommend workouts based on the muscle you want to train. I graduated with a 2:2 and an Honours.',
  },
]

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
  let [allWritings, calendar] = await Promise.all([
    getAllWritings(),
    getContributionCalendar(),
  ])
  let writings = allWritings.slice(0, 3)

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
            I build and ship cool and innovative products from scratch - from
            AI systems to full-stack software applications - most of it
            running quietly in production for people who depend on it. I currently lead applied
            AI research and engineering at Kollestee UK Global. Previously, I
            worked as a Software Engineer and Machine Learning Engineer across
            startups and mid-sized companies, while earning a BSc in Computer
            Science and an MSc in Artificial Intelligence. Outside of work, I
            build and ship my own products and tools.
          </p>
        </header>

        <div className="mt-16 space-y-14 sm:mt-20">
          {/* Full-width section (no label): the heatmap spans the same width
              as the intro paragraph above. */}
          <section id="github" className="scroll-mt-20">
            {calendar ? (
              <ContributionGraph calendar={calendar} />
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">
                <Link href={githubProfileUrl} className={plainLink}>
                  See my contributions on GitHub ↗
                </Link>
              </p>
            )}
          </section>

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
              Do you have an idea you want built into a real, working product?
              An AI feature you want done properly, not bolted on? Or something
              you&rsquo;re trying to get off the ground but need someone to
              actually build and ship it? That&rsquo;s the kind of work I love.
              I build cool and innovative products from scratch - from AI
              systems to full-stack software applications - and take them all
              the way to something people can use. Wherever it&rsquo;s at - a rough idea, a design,
              or a half-built product that needs finishing - tell me about it,
              and let&rsquo;s have a chat.
            </p>
            <ContactForm />
          </Row>
        </div>
      </Column>
    </main>
  )
}
