import Link from '@/components/Link'
import { SimpleLayout } from '@/components/SimpleLayout'
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
    month: 'long',
    day: 'numeric',
  })
}

export default async function Writings() {
  let writings = await getAllWritings()

  return (
    <SimpleLayout
      title="Writings"
      intro="A casual corner where I jot down whatever I’ve been thinking about - usually AI, software engineering, or a bit of tech news that caught my eye. Not a regular blog. I write when something feels worth sharing, which is occasionally rather than on a schedule."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {writings.map((writing) => (
            <article
              key={writing.slug}
              className="md:grid md:grid-cols-4 md:items-baseline"
            >
              <div className="group relative flex flex-col items-start md:col-span-3">
                <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                  <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                  <span className="relative z-10">
                    {writing.frontmatter.title}
                  </span>
                </h2>
                <time
                  dateTime={writing.frontmatter.date}
                  className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-500 dark:text-zinc-400 md:hidden"
                  aria-label={formatDate(writing.frontmatter.date)}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center">
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  </span>
                  {formatDate(writing.frontmatter.date)}
                </time>
                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {writing.frontmatter.description}
                </p>
                <Link
                  href={`/writings/${writing.slug}`}
                  className="relative z-20 mt-4 flex items-center text-sm font-medium text-teal-500 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Read more
                </Link>
              </div>
              <time
                dateTime={writing.frontmatter.date}
                className="mt-1 hidden text-sm text-zinc-500 dark:text-zinc-400 md:block"
              >
                {formatDate(writing.frontmatter.date)}
              </time>
            </article>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
