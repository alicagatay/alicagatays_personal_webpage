import { type Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/Link'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
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

function CalendarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      fill="#90909a"
      width="22px"
      height="22px"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>calendar-check</title>
      <path d="M28 4.75h-0.75v-2.75c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 2.75h-17.5v-2.75c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 2.75h-0.75c-1.794 0.002-3.248 1.456-3.25 3.25v19.998c0.002 1.794 1.456 3.248 3.25 3.25h24c1.794-0.001 3.249-1.456 3.25-3.25v-19.998c-0.002-1.794-1.456-3.248-3.25-3.25h-0zM4 7.25h24c0.414 0 0.75 0.336 0.75 0.75v2.75h-25.5v-2.75c0.001-0.414 0.336-0.749 0.75-0.75h0zM28 28.748h-24c-0.414-0-0.75-0.336-0.75-0.75v-14.748h25.5v14.748c-0 0.414-0.336 0.75-0.75 0.75v0zM19.57 16.682l-5.86 6.405-1.323-1.313c-0.226-0.223-0.536-0.361-0.878-0.361-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0l2.247 2.23 0.022 0.015 0.015 0.021c0.074 0.061 0.159 0.114 0.25 0.156l0.007 0.003c0.037 0.026 0.079 0.053 0.123 0.077l0.007 0.003c0.135 0.056 0.292 0.089 0.457 0.089 0.175 0 0.341-0.037 0.491-0.103l-0.008 0.003c0.053-0.031 0.098-0.061 0.14-0.094l-0.003 0.002c0.102-0.050 0.189-0.11 0.268-0.179l-0.001 0.001 0.015-0.023 0.020-0.014 6.738-7.365c0.203-0.221 0.328-0.518 0.328-0.844 0-0.69-0.559-1.25-1.25-1.25-0.365 0-0.693 0.156-0.921 0.405l-0.001 0.001z"></path>
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Ali Cagatay. I live in Birmingham, where I code the future.',
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
              alt=""
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
