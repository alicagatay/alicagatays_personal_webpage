import { type Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/Link'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { routing, type Locale } from '@/i18n/routing'
import logoBoardOfDirectors from '@/images/logos/board-of-directors.svg'
import logoTimer from '@/images/logos/timer.svg'
import logoMetronome from '@/images/logos/metronome.svg'
import logoM from '@/images/logos/letter-m.svg'

const projects = [
  {
    id: 'boardOfDirectors',
    websiteHref: 'https://board-of-directors-rag.vercel.app/',
    githubHref: 'https://github.com/alicagatay/board-of-directors-rag',
    logo: logoBoardOfDirectors,
  },
  {
    id: 'microMarketingAssistant',
    websiteHref: 'https://www.micro-marketing-assistant.com/',
    githubHref: 'https://github.com/alicagatay/micro-marketing-assistant',
    logo: logoM,
  },
  {
    id: 'focusTimer',
    websiteHref: 'https://focus-timer-sandy.vercel.app/',
    githubHref: 'https://github.com/alicagatay/micro-marketing-assistant',
    logo: logoTimer,
  },
  {
    id: 'metronome',
    websiteHref: '/projects',
    githubHref: undefined,
    logo: logoMetronome,
  },
] as const

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  let { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  let typedLocale = locale as Locale
  let t = await getTranslations({
    locale: typedLocale,
    namespace: 'projects.meta',
  })
  return buildPageMetadata({
    locale: typedLocale,
    path: '/projects',
    title: t('title'),
    description: t('description'),
  })
}

export default async function Projects() {
  let t = await getTranslations('projects')

  return (
    <SimpleLayout title={t('title')} intro={t('intro')}>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.id}>
            <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6" />
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt={`${t(`items.${project.id}.name`)} logo`}
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link
                disabled
                overlay={false}
                className="transition group-hover:text-teal-500 dark:group-hover:text-teal-400"
              >
                {t(`items.${project.id}.name`)}
              </Card.Link>
            </h2>
            <Card.Description>
              {t(`items.${project.id}.description`)}
            </Card.Description>
            <div className="relative z-10 mt-6 flex flex-col gap-3 text-sm font-medium">
              {project.websiteHref ? (
                <Link
                  href={project.websiteHref}
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition hover:text-teal-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-teal-400"
                >
                  <LinkIcon className="h-5 w-5 flex-none" />
                  <span className="ml-2">
                    {t(`items.${project.id}.websiteLabel`)}
                  </span>
                </Link>
              ) : null}
              {project.githubHref ? (
                <Link
                  href={project.githubHref}
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-zinc-700 transition hover:text-teal-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:text-teal-400"
                >
                  <LinkIcon className="h-5 w-5 flex-none" />
                  <span className="ml-2">
                    {t(`items.${project.id}.githubLabel`)}
                  </span>
                </Link>
              ) : null}
            </div>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
