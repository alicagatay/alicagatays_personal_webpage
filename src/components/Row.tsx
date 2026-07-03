import clsx from 'clsx'

// A minimalist "LABEL → value" definition row: a tiny uppercase label in a
// fixed left column on desktop, stacking above the value on mobile.
export function Row({
  label,
  id,
  className,
  children,
}: {
  label: string
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={clsx(
        'grid scroll-mt-20 grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[120px_1fr]',
        className,
      )}
    >
      <h2 className="text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 sm:pt-1.5">
        {label}
      </h2>
      {/* min-w-0 lets wide content (the GitHub heatmap) scroll inside the
          column instead of blowing the grid out past the viewport. */}
      <div className="min-w-0">{children}</div>
    </section>
  )
}
