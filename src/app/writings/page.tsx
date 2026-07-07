import Link from '@/components/Link'
import { Column } from '@/components/Column'
import { LinkList, type LinkListItem } from '@/components/LinkList'
import { buildPageMetadata } from '@/lib/metadata'
import { getAllWritings } from '@/lib/writings'

export const metadata = buildPageMetadata({
  path: '/writings',
  title: 'Writings',
  description:
    'An occasional writing spot by Ali Cagatay - thoughts on AI, software engineering, and the odd bit of tech news. Not a regular blog; updated whenever something is worth sharing.',
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
  })
}

export default async function Writings() {
  let writings = await getAllWritings()

  let items: LinkListItem[] = writings.map((writing) => ({
    title: writing.frontmatter.title,
    href: `/writings/${writing.slug}`,
    meta: formatDate(writing.frontmatter.date),
    blurb: writing.frontmatter.description,
  }))

  return (
    <main className="pb-32 pt-24 sm:pt-32">
      <Column>
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Writings
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            Occasional notes on whatever I’ve been thinking about - usually AI,
            software engineering, product building, founding, or a bit of tech
            news. I write when something feels worth sharing, not on a schedule.
          </p>
        </header>

        <div className="mt-12">
          {items.length > 0 ? (
            <LinkList items={items} />
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              Nothing here yet - check back soon.
            </p>
          )}
        </div>

        <p className="mt-16 text-sm">
          <Link
            href="/"
            className="text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-teal-400"
          >
            ← Back home
          </Link>
        </p>
      </Column>
    </main>
  )
}
