import { ContributionTooltip } from '@/components/ContributionTooltip'
import type { ContributionCalendar, ContributionDay } from '@/lib/github'

// A 10-step ramp (empty + 9 teal intensities) of complete literal class
// strings (Tailwind scans source for whole class names, so these must never
// be concatenated). Site-native teal on the paper/ink backgrounds.
let LEVEL_CLASSES = [
  'fill-[#e8e6dd] dark:fill-[#24231b]',
  'fill-teal-100 dark:fill-teal-950',
  'fill-teal-200 dark:fill-teal-900',
  'fill-teal-300 dark:fill-teal-800',
  'fill-teal-400 dark:fill-teal-700',
  'fill-teal-500 dark:fill-teal-600',
  'fill-teal-600 dark:fill-teal-500',
  'fill-teal-700 dark:fill-teal-400',
  'fill-teal-800 dark:fill-teal-300',
  'fill-teal-900 dark:fill-teal-200',
]

// Cell colour is bucketed here from daily counts, log-scaled against the
// year's busiest day, NOT from GitHub's 0-4 `day.level` (still parsed and
// stored by src/lib/github.ts). GitHub's per-user quartiles saturate: a 52-
// and a 667-contribution day both land on level 4. The log scale keeps
// order-of-magnitude gaps visible; percentile buckets would re-merge them
// on a heavy-tailed year.
function buildLevelFor(weeks: ContributionDay[][]) {
  let max = 0
  for (let week of weeks)
    for (let day of week) if (day.count > max) max = day.count
  return function levelFor(count: number) {
    if (count === 0 || max === 0) return 0
    let ratio = Math.log(count + 1) / Math.log(max + 1)
    return 1 + Math.min(8, Math.floor(ratio * 9))
  }
}

let cellSize = 16
let gap = 4
let step = cellSize + gap
let gutterLeft = 46
let gutterTop = 28

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
  let levelFor = buildLevelFor(weeks)

  return (
    <div>
      {/* rtl scroller: narrow screens open on the most recent weeks, no JS.
          tabIndex makes it keyboard-scrollable in browsers (Safari) that don't
          focus child-less scroll containers implicitly. */}
      <ContributionTooltip>
        <div
          dir="rtl"
          tabIndex={0}
          role="region"
          aria-label="GitHub contribution graph, scrollable"
          className="max-w-full overflow-x-auto"
        >
          {/* Rendered at its intrinsic size (wider than the column) inside the
            rtl scroll container - w-fit keeps the wrapper's box as wide as
            the SVG, since overflow spilling from a child on the start side
            of an rtl scroller is unreachable. */}
          <div dir="ltr" className="w-fit">
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label={`${total} contributions in the last year`}
              className="block"
            >
              {monthLabels.map((entry) => (
                <text
                  key={`${entry.label}-${entry.weekIndex}`}
                  x={gutterLeft + entry.weekIndex * step}
                  y={16}
                  className="fill-zinc-400 text-[15px] dark:fill-zinc-500"
                >
                  {entry.label}
                </text>
              ))}
              {['Mon', 'Wed', 'Fri'].map((label, index) => (
                <text
                  key={label}
                  x={0}
                  y={gutterTop + (index * 2 + 1) * step + cellSize - 4}
                  className="fill-zinc-400 text-[15px] dark:fill-zinc-500"
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
                    rx={3}
                    data-tooltip={formatDayTitle(day)}
                    className={LEVEL_CLASSES[levelFor(day.count)]}
                  />
                )),
              )}
            </svg>
          </div>
        </div>
      </ContributionTooltip>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-zinc-400 dark:text-zinc-500">
        <p>{total} contributions in the last year</p>
        <div aria-hidden className="flex items-center gap-1">
          <span>Less</span>
          {LEVEL_CLASSES.map((levelClass) => (
            <svg key={levelClass} width={12} height={12} className="block">
              <rect width={12} height={12} rx={3} className={levelClass} />
            </svg>
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
