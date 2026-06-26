import Link from '@/components/Link'
import { Column } from '@/components/Column'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = {
  ...buildPageMetadata({
    path: '/thank-you',
    title: 'You’re subscribed',
    description: 'Thanks for subscribing to my newsletter.',
  }),
  robots: { index: false, follow: false },
}

export default function ThankYou() {
  return (
    <main className="pt-24 pb-32 sm:pt-32">
      <Column>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Thanks for subscribing.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          I&rsquo;ll email you whenever I publish a new post, release a new
          project, or have something worth sharing. Unsubscribe any time, no
          hard feelings.
        </p>
        <p className="mt-10 text-sm">
          <Link
            href="/"
            className="text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-teal-400"
          >
            ← Back home
          </Link>
        </p>
      </Column>
    </main>
  )
}
