import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoBoardOfDirectors from '@/images/logos/board-of-directors.svg'
import logoTimer from '@/images/logos/timer.svg'
import logoMetronome from '@/images/logos/metronome.svg'
import logoM from '@/images/logos/letter-m.svg'

const projects = [
  {
    name: 'Board of Directors RAG',
    description:
      'A retrieval-augmented generation system built from transcripts of business and lifestyle YouTubers, letting you ask questions and get answers grounded in what those creators have actually said in their videos previously.',
    links: {
      github: {
        href: 'https://github.com/alicagatay/board-of-directors-rag',
        label: 'GitHub',
      },
    },
    logo: logoBoardOfDirectors,
  },
  {
    name: 'Micro Marketing Assistant',
    description:
      'Micro Marketing Assistant is a minimal and fast CRM tool for small businesses and business people that helps them manage and track the products they are selling or trying to sell and to whom they are selling the product into.',
    links: {
      website: {
        href: 'https://www.micro-marketing-assistant.com/',
        label: 'Website',
      },
    },
    logo: logoM,
  },
  {
    name: 'Focus Timer',
    description:
      'A simple web application with a clean user interface where you can set a timer for your work and break sessions.',
    links: {
      website: {
        href: 'https://focus-timer-sandy.vercel.app/',
        label: 'Website',
      },
    },
    logo: logoTimer,
  },
  {
    name: 'Metronome',
    description: 'Coming soon.',
    links: {
      website: {
        href: '/projects',
        label: 'Website',
      },
    },
    logo: logoMetronome,
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve made trying to put my dent in the universe."
      intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6" />
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {project.name}
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <div className="relative z-10 mt-6 flex flex-wrap gap-3 text-sm font-medium">
              {project.links.website ? (
                <Link
                  href={project.links.website.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-zinc-700 dark:text-zinc-200"
                >
                  <LinkIcon className="h-5 w-5 flex-none" />
                  <span className="ml-2">{project.links.website.label}</span>
                </Link>
              ) : null}
              {project.links.github ? (
                <Link
                  href={project.links.github.href}
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-zinc-700 dark:text-zinc-200"
                >
                  <LinkIcon className="h-5 w-5 flex-none" />
                  <span className="ml-2">{project.links.github.label}</span>
                </Link>
              ) : null}
            </div>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
