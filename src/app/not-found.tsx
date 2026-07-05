import Link from '@/components/Link'
import { Column } from '@/components/Column'

export default function NotFound() {
  return (
    <main className="pb-32 pt-24 sm:pt-32">
      <Column>
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          Sorry, I couldn’t find that page.
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
