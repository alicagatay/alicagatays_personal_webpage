import type { ContributionCalendar, ContributionDay } from '@/lib/github'

// One swappable 5-tuple of complete literal class strings (Tailwind scans
// source for whole class names, so these must never be concatenated).
// Active: site-native teal ramp on the paper/ink backgrounds.
let LEVEL_CLASSES = [
  'fill-[#e8e6dd] dark:fill-[#24231b]',
  'fill-teal-200 dark:fill-teal-900',
  'fill-teal-400 dark:fill-teal-700',
  'fill-teal-600 dark:fill-teal-500',
  'fill-teal-800 dark:fill-teal-300',
]
// Alternate: GitHub's current production palette (July 2026), level 0 adapted
// to paper/ink. Kept commented so Tailwind doesn't emit unused CSS.
// let LEVEL_CLASSES = [
//   'fill-[#eae8de] dark:fill-[#22281f]',
//   'fill-[#aceebb] dark:fill-[#033a16]',
//   'fill-[#4ac26b] dark:fill-[#196c2e]',
//   'fill-[#2da44e] dark:fill-[#2ea043]',
//   'fill-[#116329] dark:fill-[#56d364]',
// ]

let cellSize = 10
let gap = 3
let step = cellSize + gap
let gutterLeft = 28
let gutterTop = 16

function formatDayTitle(day: ContributionDay) {
  let date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
  if (day.count === 0) return `No contributions on ${date}`
  if (day.count === 1) return `1 contribution on ${date}`
  return `${day.count} contributions on ${date}`
}

type MonthLabel = { weekIndex: number; label: string }

function getMonthLabels(weeks: ContributionDay[][]): MonthLabel[] {
  let labels: MonthLabel[] = []
  let previousMonth = -1
  weeks.forEach((week, weekIndex) => {
    let firstDay = week[0]
    if (!firstDay) return
    let date = new Date(`${firstDay.date}T00:00:00Z`)
    let month = date.getUTCMonth()
    if (month !== previousMonth) {
      labels.push({
        weekIndex,
        label: date.toLocaleDateString('en-GB', {
          month: 'short',
          timeZone: 'UTC',
        }),
      })
      previousMonth = month
    }
  })
  // Drop labels spanning fewer than two week columns (partial months at the
  // window edges) so neighbouring labels never collide.
  return labels.filter((entry, index) => {
    let nextIndex =
      index + 1 < labels.length ? labels[index + 1].weekIndex : weeks.length
    return nextIndex - entry.weekIndex >= 2
  })
}

export function ContributionGraph({
  calendar,
}: {
  calendar: ContributionCalendar
}) {
  let weeks = calendar.weeks
  let width = gutterLeft + weeks.length * step - gap
  let height = gutterTop + 7 * step - gap
  let monthLabels = getMonthLabels(weeks)
  let total = calendar.total.toLocaleString('en-GB')

  return (
    <div>
      {/* rtl scroller: narrow screens open on the most recent weeks, no JS.
          tabIndex makes it keyboard-scrollable in browsers (Safari) that don't
          focus child-less scroll containers implicitly. */}
      <div
        dir="rtl"
        tabIndex={0}
        role="region"
        aria-label="GitHub contribution graph, scrollable"
        className="max-w-full overflow-x-auto"
      >
        {/* Scales to the full column width; the wrapper's min-w keeps cells
            readable on narrow screens, where the rtl container scrolls
            (min-w must sit on the wrapper - overflow spilling from a child
            on the start side of an rtl scroller is unreachable). */}
        <div dir="ltr" className="min-w-[560px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`${total} contributions in the last year`}
            className="block h-auto w-full"
          >
            {monthLabels.map((entry) => (
              <text
                key={`${entry.label}-${entry.weekIndex}`}
                x={gutterLeft + entry.weekIndex * step}
                y={10}
                className="fill-zinc-400 text-[10px] dark:fill-zinc-500"
              >
                {entry.label}
              </text>
            ))}
            {['Mon', 'Wed', 'Fri'].map((label, index) => (
              <text
                key={label}
                x={0}
                y={gutterTop + (index * 2 + 1) * step + cellSize - 2}
                className="fill-zinc-400 text-[10px] dark:fill-zinc-500"
              >
                {label}
              </text>
            ))}
            {weeks.map((week, weekIndex) =>
              // Cells are positioned by weekday, never array index - the
              // first and last weeks of the window are usually partial.
              week.map((day) => (
                <rect
                  key={day.date}
                  x={gutterLeft + weekIndex * step}
                  y={gutterTop + day.weekday * step}
                  width={cellSize}
                  height={cellSize}
                  rx={2}
                  className={LEVEL_CLASSES[day.level]}
                >
                  <title>{formatDayTitle(day)}</title>
                </rect>
              )),
            )}
          </svg>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-zinc-400 dark:text-zinc-500">
        <p>{total} contributions in the last year</p>
        <div aria-hidden className="flex items-center gap-1">
          <span>Less</span>
          {LEVEL_CLASSES.map((levelClass) => (
            <svg key={levelClass} width={10} height={10} className="block">
              <rect width={10} height={10} rx={2} className={levelClass} />
            </svg>
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
