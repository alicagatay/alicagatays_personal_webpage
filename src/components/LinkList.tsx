import Link from '@/components/Link'

export type LinkListItem = {
  title: string
  href: string
  blurb?: string
  meta?: string
  secondary?: { label: string; href: string }
}

// A scannable list of "title → blurb" rows used for projects and writing.
// The title links out; an optional secondary link (e.g. "code") sits beside it.
export function LinkList({ items }: { items: LinkListItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.title}>
          <div className="flex flex-col gap-x-4 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-zinc-900 dark:text-zinc-100">
              <Link
                href={item.href}
                className="font-medium underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 hover:decoration-teal-700 dark:decoration-zinc-600 dark:hover:text-teal-400 dark:hover:decoration-teal-400"
              >
                {item.title}
              </Link>
              {item.secondary ? (
                <>
                  <span
                    aria-hidden
                    className="px-2 text-zinc-300 dark:text-zinc-600"
                  >
                    ·
                  </span>
                  <Link
                    href={item.secondary.href}
                    className="text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-teal-400"
                  >
                    {item.secondary.label}
                  </Link>
                </>
              ) : null}
            </p>
            {item.meta ? (
              <p className="mt-0.5 shrink-0 text-sm text-zinc-600 dark:text-zinc-400 sm:mt-0">
                {item.meta}
              </p>
            ) : null}
          </div>
          {item.blurb ? (
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.blurb}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}
