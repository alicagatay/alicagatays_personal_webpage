import Image from 'next/image'
import Link from '@/components/Link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import { buildPageMetadata } from '@/lib/metadata'
import portraitImage from '@/images/portrait.jpg'

export const metadata = buildPageMetadata({
  path: '/about',
  title: 'About',
  description:
    'AI engineer based in Birmingham. MSc Artificial Intelligence (Distinction track) at Birmingham City University, BSc Computer Science at the University of Birmingham. Specialising in deep learning, computer vision, and agentic systems.',
  openGraphType: 'profile',
})

let paragraphs = [
  'I’ve loved making things for as long as I can remember, and I created my first program when I was 14 years old - a retro snake game in Scratch. From that moment on, I knew I wanted to be a software engineer, so I started learning how to code in my free time with a programming language called Processing.',
  'I then went on to study Computer Science at the University of Birmingham, where I gained a strong foundation in software engineering, data structures, algorithms, machine learning, artificial intelligence, and mobile & ubiquitous computing. During this time, I worked on projects I genuinely loved, such as developing a computer vision algorithm to classify brain scans for tumour detection and building a mobile app that uses machine learning and natural language processing to recommend workouts based on user messages. Alongside my studies, I joined CodeYourFuture as a volunteer mentor, a non-profit organisation that delivers full-stack web development training to people from disadvantaged backgrounds, including refugees, asylum seekers, and low-income families. What started as a one-off commitment has grown into a five-year journey: I now lead or co-lead Saturday classes, supporting trainees one-to-one and reviewing their pull requests across JavaScript, Python, Git, Jest, and SQL. The role has sharpened not only my technical skills but also my ability to translate complex ideas into plain language and collaborate effectively with teams of mentors and engineers.',
  'Later on, I chose to deepen my interest in this field by pursuing a Master’s degree in Artificial Intelligence at Birmingham City University, where I’m currently on track for a Distinction. The programme has let me dive into the areas I’d been itching to explore properly, including deep learning, machine learning, applied artificial intelligence, data visualisation, and the broader impact of artificial intelligence on society. My dissertation, carried out in collaboration with ProBuild360, focuses on multimodal deep learning for property price prediction in the Birmingham housing market, fusing geo-spatial and temporal data to push beyond the traditional regression baselines. Outside of coursework, I’ve been busy building things that genuinely excite me: a multi-agent Retrieval-Augmented Generation system that ingests 484 YouTube transcripts from 18 creators and answers questions through a persona-driven, five-stage retrieval pipeline; and CouncilAgent, a voice-based artificial intelligence assistant for Birmingham City Council that my team and I built in five hours at the Microsoft Midlands Hackathon, finishing third out of fifteen university teams. Alongside the Master’s, I completed a Machine Learning Engineer internship at Kollestee UK Global, where I integrated machine learning algorithms into robotic systems, engineered data pipelines for large-scale 3D and 2D datasets, and helped deliver artificial intelligence solutions that meaningfully moved the needle on product performance.',
  'After that, I undertook a six-month placement at ProBuild360 as an Artificial Intelligence & Data Analytics Software Engineer, where I refined production artificial intelligence models, shipped a cross-platform mobile application built in React Native from an internal Next.js web tool, and worked within a six-person Agile engineering team to ensure feature parity across web and mobile for around twelve active users. Currently, I’m back at Kollestee UK Global, this time as Artificial Intelligence Engineering & Research Lead. My main focus is Follicle Labeller, a cross-platform medical imaging tool that I architected and built from the ground up to replace a licensed third-party annotation platform. It combines YOLO11 detection and keypoint models with classical computer vision techniques to help clinicians annotate hair grafts on high-resolution scalp images, and track them in real time across live surgical video, all wrapped up in a Windows, macOS, and browser app shipped from a single codebase. Day to day, I work directly with the Chief Technology Officer and Product Owner on applied research and rapid prototyping of new artificial intelligence solutions across our products and robotic systems, and it’s easily the most rewarding role I’ve had so far.',
]

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

export default function About() {
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
            My Path So Far
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
