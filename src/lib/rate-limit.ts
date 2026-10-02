import 'server-only'
import { headers } from 'next/headers'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let configured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
)

// Shared with email-verification.ts, which stores its codes and passes here.
export let redis = configured ? Redis.fromEnv() : null

// Plain `next dev` on a laptop. `next build`, `next start` and every Vercel
// deployment (previews included) count as production, so the in-memory and
// console fallbacks keyed off this can never switch on there.
export let isLocalDev =
  process.env.NODE_ENV !== 'production' && !process.env.VERCEL

// Verification keys are scoped per deployment environment, so a preview can
// never spend production's allowances.
let verifyScope = `verify:${process.env.VERCEL_ENV ?? 'dev'}`

type Algorithm = ReturnType<typeof Ratelimit.slidingWindow>

// The in-process cache of blocked identifiers is off: it remembers a block
// until the end of the current fixed window, which for a sliding daily limit
// can keep a warm instance refusing everyone through the whole next day after
// Redis has already freed up. At this traffic the extra Redis call is nothing.
function limiter(algorithm: Algorithm, prefix: string) {
  return redis
    ? new Ratelimit({
        redis,
        limiter: algorithm,
        prefix,
        ephemeralCache: false,
      })
    : null
}

// Enquiries. Per-IP: a real person rarely sends more than a couple in a short
// window. Global: a hard daily ceiling well under Resend's 100/day free tier,
// so even a flood spread across many IPs can't drain the quota or bury the
// inbox - the exact outcome the form exists to prevent.
let enquiryPerIp = limiter(Ratelimit.slidingWindow(3, '10 m'), 'enquiry:ip')
let enquiryGlobal = limiter(
  Ratelimit.slidingWindow(40, '1 d'),
  'enquiry:global',
)

// Verification-code emails. These go to whatever address a visitor types, so
// they're capped per IP, per mailbox (hourly and daily, so nobody can flood one
// person's inbox), and site-wide. 50 codes + 40 enquiries a day = 90, inside
// Resend's free 100/day; the 10 spare codes cover resends.
let sendPerIp = limiter(
  Ratelimit.slidingWindow(5, '1 h'),
  `${verifyScope}:send:ip`,
)
let sendPerMailbox = limiter(
  Ratelimit.slidingWindow(3, '1 h'),
  `${verifyScope}:send:addr`,
)
let sendPerMailboxDaily = limiter(
  Ratelimit.slidingWindow(5, '1 d'),
  `${verifyScope}:send:addr-day`,
)
let sendGlobal = limiter(
  Ratelimit.slidingWindow(50, '1 d'),
  `${verifyScope}:send:global`,
)

// Code checks, per IP, on top of the 5-tries-per-code limit in
// email-verification.ts. Deliberately no per-address check limit: anyone who
// knows an address could fill it with made-up challenges and lock the real
// visitor out. Guessing per inbox is already capped by 5 tries per code and
// the per-mailbox send limits above.
let checkPerIp = limiter(
  Ratelimit.slidingWindow(20, '1 h'),
  `${verifyScope}:check:ip`,
)

// Vercel overwrites both headers with the real client address, so neither
// can be spoofed there.
export async function clientIp() {
  let headerList = await headers()
  return (
    headerList.get('x-real-ip') ||
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

// Runs the checks one at a time, narrowest first, and stops at the first
// refusal - so a request one limiter turns away never spends another limiter's
// budget (one IP can't burn the site-wide allowance). With `failOpen`, a Redis
// error or timeout lets the request through; without it, they block it.
// @upstash/ratelimit reports a timeout as success, hence the explicit check.
async function withinLimits(
  checks: Array<[Ratelimit | null, string | (() => Promise<string>)]>,
  failOpen: boolean,
) {
  try {
    for (let [check, identifier] of checks) {
      if (!check) return failOpen
      let id = typeof identifier === 'string' ? identifier : await identifier()
      let result = await check.limit(id)
      if (result.reason === 'timeout') {
        if (failOpen) continue
        console.error('Rate-limit check timed out; blocking.')
        return false
      }
      if (!result.success) return false
    }
    return true
  } catch (err) {
    console.error(
      `Rate-limit check failed; ${failOpen ? 'allowing through' : 'blocking'}.`,
      err,
    )
    return failOpen
  }
}

let warned = false

// Returns false when the caller has exceeded the per-IP or global allowance.
// Fails open (returns true) if Upstash isn't configured or the check errors, so
// a transient Redis problem never blocks a genuine enquiry. (Every enquiry
// also needs a verified email, which does require Upstash in production.)
export async function enquiryRateLimitOk(): Promise<boolean> {
  if (!redis) {
    if (!warned) {
      warned = true
      console.warn(
        'Enquiry rate limiting is off: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable it.',
      )
    }
    return true
  }

  return withinLimits(
    [
      [enquiryPerIp, clientIp],
      [enquiryGlobal, 'all'],
    ],
    true,
  )
}

// The verification limits below fail closed: a code email can go to any
// address, so when Upstash is missing or failing nothing is sent. Only local
// `next dev` without Upstash skips them (see email-verification.ts).

// Per-IP and per-mailbox limits on sending a code. The site-wide cap is a
// separate step so the cheap per-visitor checks (and the MX lookup between
// them) can turn junk away before it spends the shared daily allowance.
export async function codeSendOk(mailboxId: string): Promise<boolean> {
  if (!redis) return isLocalDev
  return withinLimits(
    [
      [sendPerIp, clientIp],
      [sendPerMailbox, mailboxId],
      [sendPerMailboxDaily, mailboxId],
    ],
    false,
  )
}

export async function codeSendGlobalOk(): Promise<boolean> {
  if (!redis) return isLocalDev
  return withinLimits([[sendGlobal, 'all']], false)
}

export async function codeCheckOk(): Promise<boolean> {
  if (!redis) return isLocalDev
  return withinLimits([[checkPerIp, clientIp]], false)
}
