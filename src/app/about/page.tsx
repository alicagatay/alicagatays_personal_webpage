import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

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

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Spencer Sharp. I live in New York City, where I design the future.',
}

export default function About() {
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
            I’m Ali Cagatay. I live in Birmingham, United Kingdom, where I
            create the future by writing code.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            {/* I’m Ali, a full stack software engineer specialising in web and
            mobile application development. I’m currently located in Birmingham,
            United Kingdom. I am also a teaching lead at CodeYourFuture,
            teaching full stack web development to disadvantaged people in the
            United Kingdom, such as refugees, asylum seekers and people from low
            income backgrounds. I also have a blog on Medium where I write about
            full-stack web development. */}
            <p>
              I’ve loved making things for as long as I can remember, and
              created my first program when I was 14 years old, a retro snake
              game in Scratch. From that moment on, I knew I wanted to be a
              software engineer, so I started learning how to code in my free
              time with a programming language called Processing.
            </p>
            <p>
              I then went on to study Computer Science at the University of
              Birmingham, where I learned about the fundamentals of software
              engineering, data structures and algorithms, machine learning,
              artificial intelligence and mobile & ubiquitous computing. I also
              worked on numerous of interesting projects, such as a computer
              vision algorithm that classifies brain scans to detect brain
              tumours, or a mobile application that uses machine learning and
              natural language processing to recommend workouts to users based
              on their messages.
            </p>
            <p>
              Today, I’m a full-stack software engineer specialising in web and
              mobile application development using tools such as Next.js,
              React.js, TypeScript, Tailwind CSS and Flutter. In addition to
              this, I am also a volunteer in a non-profit organisation called
              CodeYourFuture as a teaching lead, where I teach full-stack web
              development to people from disadvantaged backgrounds, such as
              refugees, asylum seekers and people from low income backgrounds.
            </p>
            <p>
              In addition, I have a blog on Medium where I constantly write
              about the tools used in full-stack web and mobile application in a
              series called <em>“The Mastery Series”</em>.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://medium.com/@aliccagatay"
              icon={MediumIcon}
            >
              Follow on Medium
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/_alicagatay/"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/alicagatay"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/alicagatay/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
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
