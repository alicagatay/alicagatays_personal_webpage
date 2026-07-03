'use client'

import { useLayoutEffect, useRef, useState } from 'react'

type TooltipState = { label: string; x: number; y: number }

// Thin interactive layer over the server-rendered heatmap: delegates pointer
// events from the SVG cells (via their data-tooltip attribute) to a single
// fixed-position pill. Fixed positioning keeps it out of the scroll
// container's clipping and lets it float above the hovered cell.
export function ContributionTooltip({
  children,
}: {
  children: React.ReactNode
}) {
  let [tooltip, setTooltip] = useState<TooltipState | null>(null)
  let pillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let pill = pillRef.current
    if (!pill || !tooltip) return
    // Clamp horizontally so cells near the viewport edges keep the pill
    // fully on screen.
    let half = pill.offsetWidth / 2
    let x = Math.max(
      half + 8,
      Math.min(tooltip.x, window.innerWidth - half - 8),
    )
    pill.style.left = `${x}px`
    pill.style.top = `${tooltip.y - 8}px`
  }, [tooltip])

  function showFor(target: Element) {
    let cell = target.closest?.('[data-tooltip]')
    let label = cell?.getAttribute('data-tooltip')
    if (!cell || !label) return
    let rect = cell.getBoundingClientRect()
    setTooltip({ label, x: rect.left + rect.width / 2, y: rect.top })
  }

  return (
    <div
      onPointerOver={(event) => showFor(event.target as Element)}
      onPointerOut={() => setTooltip(null)}
      onPointerLeave={() => setTooltip(null)}
      onScrollCapture={() => setTooltip(null)}
    >
      {children}
      {tooltip ? (
        <div
          ref={pillRef}
          role="tooltip"
          className="pointer-events-none fixed z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1.5 text-sm font-medium text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {tooltip.label}
        </div>
      ) : null}
    </div>
  )
}
