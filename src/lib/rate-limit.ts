import { headers } from 'next/headers'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Rate limiting is opt-in: it only runs when Upstash is configured. That keeps
// local dev (and any deploy without the keys) working - the form still sends,
// it just isn't throttled - while a configured production deploy is protected.
let configured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
)

let redis = configured ? Redis.fromEnv() : null

// Per-IP: a real person rarely sends more than a couple of enquiries in a short
// window. Global: a hard daily ceiling well under Resend's 100/day free tier,
// so even a flood spread across many IPs can't drain the quota or bury the
// inbox - the exact outcome the form exists to prevent.
let perIp = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '10 m'),
      prefix: 'enquiry:ip',
    })
  : null

let global = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(40, '1 d'),
      prefix: 'enquiry:global',
    })
  : null

let warned = false

// Returns false when the caller has exceeded the per-IP or global allowance.
// Fails open (returns true) if Upstash isn't configured or the check errors, so
// a transient Redis problem never blocks a genuine enquiry.
export async function enquiryRateLimitOk(): Promise<boolean> {
  if (!perIp || !global) {
    if (!warned) {
      warned = true
      console.warn(
        'Enquiry rate limiting is off: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable it.',
      )
    }
    return true
  }

  try {
    let headerList = await headers()
    let ip =
      headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headerList.get('x-real-ip') ||
      'unknown'

    let [byIp, byGlobal] = await Promise.all([
      perIp.limit(ip),
      global.limit('all'),
    ])

    return byIp.success && byGlobal.success
  } catch (err) {
    console.error('Enquiry rate-limit check failed; allowing through.', err)
    return true
  }
}
