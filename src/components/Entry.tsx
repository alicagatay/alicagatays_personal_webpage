import Link from '@/components/Link'

// A detailed work / education / recognition item: title + right-aligned meta,
// a tightened description, and an optional external link.
export function Entry({
  title,
  meta,
  href,
  linkLabel,
  children,
}: {
  title: string
  meta?: string
  href?: string
  linkLabel?: string
  children?: React.ReactNode
}) {
  return (
    <div>
      <div className="flex flex-col gap-x-4 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
        {meta ? (
          <p className="mt-0.5 shrink-0 text-sm text-zinc-400 dark:text-zinc-500 sm:mt-0">
            {meta}
          </p>
        ) : null}
      </div>
      {children ? (
        <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {children}
        </p>
      ) : null}
      {href && linkLabel ? (
        <Link
          href={href}
          className="mt-2 inline-block text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 hover:decoration-teal-700 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-teal-400 dark:hover:decoration-teal-400"
        >
          {linkLabel} ↗
        </Link>
      ) : null}
    </div>
  )
}
