import clsx from 'clsx'

// The single narrow, centered reading column shared by every page.
export function Column({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx('mx-auto max-w-[640px] px-6', className)}>
      {children}
    </div>
  )
}
