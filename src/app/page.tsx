import Image from 'next/image'
import clsx from 'clsx'

import Link from '@/components/Link'
import { Container } from '@/components/Container'
import { JsonLd } from '@/components/JsonLd'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteUrl } from '@/lib/site-url'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'

let siteUrl = getSiteUrl()

let metaDescription =
  'I am Ali Cagatay, an AI engineer in Birmingham specialising in deep learning, computer vision, agentic systems, and full-stack software engineering. I take research-grade AI from notebook to production.'

let photoAlts = [
  'Ali Cagatay working on a laptop',
  'Ali Cagatay with teammates at a hackathon',
  'Ali Cagatay presenting at a tech event',
  'Ali Cagatay at the University of Birmingham',
  'Ali Cagatay enjoying a moment outdoors',
]

export const metadata = buildPageMetadata({
  path: '/',
  description: metaDescription,
  openGraphType: 'profile',
})

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Photos({ alts }: { alts: string[] }) {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  let images = [image1, image2, image3, image4, image5]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt={alts[imageIndex] ?? 'Ali Cagatay'}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

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

export default function Home() {
  return (
    <>
      <JsonLd id="schema-person" data={personSchema} />
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Hi, I’m Ali! I’m an AI engineer building intelligent systems and
            full-stack software products.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I am an AI engineer specialising in deep learning, computer vision,
            agentic systems, and full-stack software development. I integrate
            artificial intelligence with full-stack software engineering to
            create scalable and reliable end-to-end products that make a real
            impact. I thrive on taking complex ideas from research to
            production, shaping them into well-crafted, reliable AI systems with
            a focus on clarity, collaboration, and long-term value.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://www.instagram.com/_alicagatay/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/alicagatay"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/alicagatay/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos alts={photoAlts} />
    </>
  )
}
