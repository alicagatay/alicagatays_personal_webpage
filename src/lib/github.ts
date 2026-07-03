import { unstable_cache } from 'next/cache'

let githubUsername = 'alicagatay'

export let githubProfileUrl = `https://github.com/${githubUsername}`

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
  weekday: number
}

export type ContributionCalendar = {
  total: number
  weeks: ContributionDay[][]
}

// GitHub buckets each day into per-user quartiles server-side; consuming the
// enum keeps the heatmap identical to github.com without reproducing the math.
let levelByName: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

// Part of the cache key so switching the token on/off (env vars are fixed
// per deployment) can never serve entries cached under the other mode.
let cacheScope = process.env.GITHUB_TOKEN ? 'auth' : 'anon'

function clampLevel(level: number): ContributionLevel {
  return level === 1 || level === 2 || level === 3 || level === 4 ? level : 0
}

function groupIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  let weeks: ContributionDay[][] = []
  for (let day of days) {
    if (day.weekday === 0 || weeks.length === 0) weeks.push([])
    weeks[weeks.length - 1].push(day)
  }
  return weeks
}

// GitHub's own public profile fragment - the same data github.com renders for
// anonymous visitors, so it counts everything the profile shows: anonymized
// private contributions AND activity in orgs that block API tokens. The
// markup is unofficial, so it's parsed strictly and any surprise falls
// through to the API tiers.
async function fetchCalendarFromProfile(): Promise<ContributionCalendar | null> {
  try {
    let res = await fetch(
      `https://github.com/users/${githubUsername}/contributions`,
      { cache: 'no-store' },
    )
    if (!res.ok) {
      console.error(
        `GitHub profile calendar fetch failed with status ${res.status}.`,
      )
      return null
    }
    let html = await res.text()

    let countById = new Map<string, number>()
    for (let match of html.matchAll(
      /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
    )) {
      let text = match[2].trim()
      let count = text.startsWith('No') ? 0 : Number.parseInt(text, 10)
      if (!Number.isNaN(count)) countById.set(match[1], count)
    }

    let days: ContributionDay[] = []
    for (let match of html.matchAll(
      /<td[^>]*ContributionCalendar-day[^>]*>/g,
    )) {
      let cell = match[0]
      let date = cell.match(/data-date="(\d{4}-\d{2}-\d{2})"/)?.[1]
      let level = cell.match(/data-level="(\d+)"/)?.[1]
      let id = cell.match(/id="([^"]+)"/)?.[1]
      if (!date || !level || !id) return null
      let count = countById.get(id)
      if (count === undefined) return null
      days.push({
        date,
        count,
        level: clampLevel(Number.parseInt(level, 10)),
        weekday: new Date(`${date}T00:00:00Z`).getUTCDay(),
      })
    }
    // A rolling year has ~365-371 cells; anything else means the markup
    // changed under us.
    if (days.length < 300 || days.length > 400) return null

    days.sort((a, b) => (a.date < b.date ? -1 : 1))
    let heading = html.match(
      /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/,
    )
    let total = heading
      ? Number.parseInt(heading[1].replaceAll(',', ''), 10)
      : days.reduce((sum, day) => sum + day.count, 0)
    return { total, weeks: groupIntoWeeks(days) }
  } catch (err) {
    console.error('GitHub profile contribution calendar fetch failed.', err)
    return null
  }
}

// Omitting from/to returns the rolling last-year window the profile shows.
let calendarQuery = `
  query {
    user(login: "${githubUsername}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`

type GraphQLCalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number
          weeks: {
            contributionDays: {
              date: string
              contributionCount: number
              contributionLevel: string
              weekday: number
            }[]
          }[]
        }
      }
    } | null
  }
  errors?: unknown[]
}

type PublicCalendarResponse = {
  total?: Record<string, number>
  contributions?: { date: string; count: number; level: number }[]
}

async function fetchCalendarFromGraphql(
  token: string,
): Promise<ContributionCalendar | null> {
  try {
    let res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: calendarQuery }),
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error(`GitHub GraphQL request failed with status ${res.status}.`)
      return null
    }
    let json: GraphQLCalendarResponse = await res.json()
    let calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar
    if (json.errors?.length || !calendar) {
      console.error('GitHub GraphQL response had errors or no calendar data.')
      return null
    }
    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levelByName[day.contributionLevel] ?? 0,
          weekday: day.weekday,
        })),
      ),
    }
  } catch (err) {
    console.error('GitHub GraphQL contribution calendar fetch failed.', err)
    return null
  }
}

// Community scraper of the public profile - only used when the token path is
// unavailable. Reflects what an anonymous visitor sees on github.com.
async function fetchCalendarFromPublicApi(): Promise<ContributionCalendar | null> {
  try {
    let res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
      { cache: 'no-store' },
    )
    if (!res.ok) {
      console.error(
        `GitHub public calendar fallback failed with status ${res.status}.`,
      )
      return null
    }
    let json: PublicCalendarResponse = await res.json()
    let days = json.contributions
    if (!days?.length) return null
    return {
      total:
        json.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0),
      weeks: groupIntoWeeks(
        days.map((day) => ({
          date: day.date,
          count: day.count,
          level: clampLevel(day.level),
          weekday: new Date(`${day.date}T00:00:00Z`).getUTCDay(),
        })),
      ),
    }
  } catch (err) {
    console.error('GitHub public contribution calendar fetch failed.', err)
    return null
  }
}

// Tiered for profile parity: the public profile fragment is what github.com
// itself shows visitors (private counts and token-blocking orgs included), so
// it goes first; the GraphQL API (stable but restricted to what the token can
// see) and the community proxy are fallbacks. A transient failure caches null
// for up to an hour by design - the row then renders a profile link instead
// of erroring the page.
export let getContributionCalendar = unstable_cache(
  async (): Promise<ContributionCalendar | null> => {
    let calendar = await fetchCalendarFromProfile()
    if (calendar) return calendar
    let token = process.env.GITHUB_TOKEN
    if (token) {
      calendar = await fetchCalendarFromGraphql(token)
      if (calendar) return calendar
    }
    return fetchCalendarFromPublicApi()
  },
  ['github-contributions', cacheScope],
  { revalidate: 3600 },
)
