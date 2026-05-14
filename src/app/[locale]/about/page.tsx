import { type Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/Link'
import clsx from 'clsx'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import { buildPageMetadata } from '@/lib/metadata'
import { routing, type Locale } from '@/i18n/routing'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

let aboutCopy: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'About Ali Cagatay',
    description:
      'AI engineer based in Birmingham. MSc Artificial Intelligence (Distinction track) at Birmingham City University, BSc Computer Science at the University of Birmingham. Specialising in deep learning, computer vision, and agentic systems.',
  },
  tr: {
    title: 'Ali Cagatay Hakkında',
    description:
      'Birmingham\'da yaşayan bir yapay zekâ mühendisi. Birmingham City University\'de Yapay Zekâ yüksek lisansını (Distinction yolunda) ve Birmingham Üniversitesi\'nde Bilgisayar Bilimi lisansını tamamladım. Derin öğrenme, bilgisayarlı görü ve agent tabanlı sistemler üzerinde çalışıyorum.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  let { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  let typedLocale = locale as Locale
  return buildPageMetadata({
    locale: typedLocale,
    path: '/about',
    title: aboutCopy[typedLocale].title,
    description: aboutCopy[typedLocale].description,
    openGraphType: 'profile',
  })
}

export default async function About() {
  let tAbout = await getTranslations('about')
  let tCommon = await getTranslations('common')
  let paragraphs = tAbout.raw('paragraphs') as string[]

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Portrait of Ali Cagatay"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {tAbout('title')}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.instagram.com/_alicagatay/"
              icon={InstagramIcon}
              className="mt-4"
            >
              {tCommon('social.instagram')}
            </SocialLink>
            <SocialLink
              href="https://github.com/alicagatay"
              icon={GitHubIcon}
              className="mt-4"
            >
              {tCommon('social.github')}
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/alicagatay/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              {tCommon('social.linkedin')}
            </SocialLink>
            <SocialLink
              href="mailto:aliccagatay@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              aliccagatay@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
