import 'server-only'
import {
  createHash,
  createHmac,
  hkdfSync,
  randomBytes,
  randomInt,
} from 'crypto'
import { promises as dns } from 'dns'
import { domainToASCII } from 'url'
import type { Redis } from '@upstash/redis'
import { maxEmailLength, normalizeEmail } from '@/lib/email'
import { isLocalDev, redis } from '@/lib/rate-limit'

// Email verification for the enquiry form: a 6-digit code emailed to the
// visitor, then a single-use "verified" pass that submitEnquiry claims.
//
// Deliberately NOT a 'use server' file. Every export of a 'use server' module
// becomes a public endpoint anyone can POST to, and these helpers (claimPass
// above all) must only ever run from our own Server Actions in contact.ts.

let codeTtlSeconds = 600
let passTtlSeconds = 3600
let restoredPassTtlSeconds = 600
let maxCodeTries = 5

let keyPrefix = `verify:${process.env.VERCEL_ENV ?? 'dev'}:`

// Thrown when verification can't run safely: no secret, no store, or the store
// failing. The actions turn it into the "email me directly" message rather
// than letting an unverified enquiry through.
export class VerificationUnavailable extends Error {}

export type CodeCheck = 'ok' | 'wrong' | 'expired' | 'locked'

// --- Addresses ---------------------------------------------------------------

// WHATWG's "valid email address" pattern (what browsers use for type="email").
// It only allows ASCII, so it runs on the punycode form of the domain.
let emailPattern =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/

// The one form of an address used everywhere downstream: the code goes to it,
// the pass stores it, and the enquiry's reply-to uses it. Returns null for
// anything that isn't a plausible address. The length check comes first so an
// oversized payload never reaches the regex.
export function canonicalEmail(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length > maxEmailLength) return null
  let email = normalizeEmail(raw)
  let at = email.lastIndexOf('@')
  if (at < 1) return null
  let domain = domainToASCII(email.slice(at + 1))
  if (!domain.includes('.')) return null
  let canon = `${email.slice(0, at)}@${domain}`
  if (canon.length > maxEmailLength || !emailPattern.test(canon)) return null
  return canon
}

// Folds the common aliases of one inbox together (me+1@, and m.e@ on Gmail) so
// the per-address rate limits can't be dodged by rewriting the address. Only
// ever used as a rate-limit key - codes still go to the address as typed.
function mailboxOf(canon: string) {
  let at = canon.lastIndexOf('@')
  let local = canon.slice(0, at).split('+')[0]
  let domain = canon.slice(at + 1)
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return `${local.replace(/\./g, '')}@gmail.com`
  }
  return `${local}@${domain}`
}

// Rejects domains that can't receive mail (typos like gmial.con, made-up
// domains, null-MX domains) before a code bounces off them - bounces count
// against the Resend account that enquiries also depend on. Any other DNS
// hiccup lets the address through rather than blocking a real visitor.
export async function domainAcceptsMail(canon: string) {
  let resolver = new dns.Resolver({ timeout: 2000, tries: 1 })
  try {
    let records = await resolver.resolveMx(
      canon.slice(canon.lastIndexOf('@') + 1),
    )
    return records.some((record) => record.exchange && record.exchange !== '.')
  } catch (err) {
    let code = (err as NodeJS.ErrnoException).code
    return code !== 'ENOTFOUND' && code !== 'ENODATA'
  }
}

// --- Keys --------------------------------------------------------------------

let derivedKeys: { id: Uint8Array; code: Uint8Array } | null = null
let localDevSecret = 'local-development-only-email-verification-secret'

// Two independent keys derived from EMAIL_VERIFICATION_SECRET: one names
// addresses in Redis (so raw addresses never appear in keys), one seals codes
// (a plain hash of a 6-digit code falls to trying all million values).
function secretKeys() {
  if (derivedKeys) return derivedKeys
  let secret =
    process.env.EMAIL_VERIFICATION_SECRET?.trim() ||
    (isLocalDev ? localDevSecret : '')
  if (Buffer.byteLength(secret) < 32) {
    console.error(
      'Email verification is off: EMAIL_VERIFICATION_SECRET is missing or shorter than 32 bytes.',
    )
    throw new VerificationUnavailable()
  }
  derivedKeys = {
    id: new Uint8Array(hkdfSync('sha256', secret, '', 'verify-id-v1', 32)),
    code: new Uint8Array(hkdfSync('sha256', secret, '', 'verify-code-v1', 32)),
  }
  return derivedKeys
}

function addressId(address: string) {
  return createHmac('sha256', secretKeys().id)
    .update(address)
    .digest('base64url')
}

function codeKey(canon: string) {
  return `${keyPrefix}code:${addressId(canon)}`
}

function codeMac(canon: string, code: string) {
  return createHmac('sha256', secretKeys().code)
    .update(`${addressId(canon)}.${code}`)
    .digest('base64url')
}

function passKey(token: string) {
  return `${keyPrefix}pass:${createHash('sha256').update(token).digest('base64url')}`
}

// The rate-limit identifier for the per-inbox caps on sending codes.
export function mailboxId(canon: string) {
  return addressId(mailboxOf(canon))
}

// A challenge-shaped value for the honeypot path, so a bot can't tell it was
// caught.
export function decoyChallenge() {
  return randomBytes(16).toString('base64url')
}

// --- Storage -----------------------------------------------------------------

type Store = {
  saveCode(key: string, mac: string, challenge: string): Promise<void>
  checkCode(key: string, mac: string, challenge: string): Promise<CodeCheck>
  deleteCode(key: string): Promise<void>
  savePass(
    key: string,
    email: string,
    ttl: number,
    onlyIfAbsent: boolean,
  ): Promise<void>
  takePass(key: string): Promise<string | null>
}

// Checks a code in one atomic step: the challenge must match the browser that
// asked for the code, a match deletes the code (so only one guess can ever
// succeed), and the fifth wrong guess deletes it too. Returning early when
// there's no code means it never leaves a key without an expiry.
let checkCodeScript = `
local stored = redis.call('HMGET', KEYS[1], 'm', 'c')
if not stored[1] or stored[2] ~= ARGV[2] then return 'expired' end
if stored[1] == ARGV[1] then
  redis.call('DEL', KEYS[1])
  return 'ok'
end
local tries = redis.call('HINCRBY', KEYS[1], 'n', 1)
if tries >= tonumber(ARGV[3]) then
  redis.call('DEL', KEYS[1])
  return 'locked'
end
return 'wrong'
`

function redisStore(client: Redis): Store {
  let script = client.createScript<CodeCheck>(checkCodeScript)
  return {
    async saveCode(key, mac, challenge) {
      // Replaces any earlier code, so only the latest one works.
      await client
        .multi()
        .del(key)
        .hset(key, { m: mac, c: challenge, n: 0 })
        .expire(key, codeTtlSeconds)
        .exec()
    },
    async checkCode(key, mac, challenge) {
      return script.exec([key], [mac, challenge, String(maxCodeTries)])
    },
    async deleteCode(key) {
      await client.del(key)
    },
    async savePass(key, email, ttl, onlyIfAbsent) {
      if (onlyIfAbsent) await client.set(key, email, { ex: ttl, nx: true })
      else await client.set(key, email, { ex: ttl })
    },
    async takePass(key) {
      return client.getdel<string>(key)
    },
  }
}

type MemoryCode = {
  mac: string
  challenge: string
  tries: number
  expiresAt: number
}
type MemoryPass = { email: string; expiresAt: number }
type Memory = {
  codes: Map<string, MemoryCode>
  passes: Map<string, MemoryPass>
}

// Local `next dev` without Upstash: the same behaviour in memory, kept on
// globalThis so it survives hot reloads.
function memoryStore(): Store {
  let host = globalThis as typeof globalThis & {
    emailVerificationMemory?: Memory
  }
  let memory = (host.emailVerificationMemory ??= {
    codes: new Map(),
    passes: new Map(),
  })
  function live<T extends { expiresAt: number }>(
    map: Map<string, T>,
    key: string,
  ) {
    let entry = map.get(key)
    if (entry && entry.expiresAt <= Date.now()) {
      map.delete(key)
      return undefined
    }
    return entry
  }
  return {
    async saveCode(key, mac, challenge) {
      memory.codes.set(key, {
        mac,
        challenge,
        tries: 0,
        expiresAt: Date.now() + codeTtlSeconds * 1000,
      })
    },
    async checkCode(key, mac, challenge) {
      let entry = live(memory.codes, key)
      if (!entry || entry.challenge !== challenge) return 'expired'
      if (entry.mac === mac) {
        memory.codes.delete(key)
        return 'ok'
      }
      entry.tries += 1
      if (entry.tries >= maxCodeTries) {
        memory.codes.delete(key)
        return 'locked'
      }
      return 'wrong'
    },
    async deleteCode(key) {
      memory.codes.delete(key)
    },
    async savePass(key, email, ttl, onlyIfAbsent) {
      if (onlyIfAbsent && live(memory.passes, key)) return
      memory.passes.set(key, { email, expiresAt: Date.now() + ttl * 1000 })
    },
    async takePass(key) {
      let entry = live(memory.passes, key)
      memory.passes.delete(key)
      return entry?.email ?? null
    },
  }
}

let store: Store | null = redis
  ? redisStore(redis)
  : isLocalDev
    ? memoryStore()
    : null

// Throws VerificationUnavailable unless both the secret and a store are in
// place. The actions call this before spending any rate-limit budget, so a
// misconfigured deploy fails closed without touching the counters.
export function assertVerificationAvailable() {
  secretKeys()
  if (!store) {
    console.error(
      'Email verification is off: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.',
    )
    throw new VerificationUnavailable()
  }
  return store
}

// Runs one storage operation, turning any store failure into
// VerificationUnavailable so callers fail closed.
async function withStore<T>(task: (store: Store) => Promise<T>) {
  let available = assertVerificationAvailable()
  try {
    return await task(available)
  } catch (err) {
    console.error('Email verification storage failed.', err)
    throw new VerificationUnavailable()
  }
}

// --- Codes -------------------------------------------------------------------

// Creates a fresh code for the address (replacing any earlier one) and returns
// it with the challenge the requesting browser must present when confirming.
// Tying the code to that browser means someone who only knows the address
// can't burn the visitor's code with wrong guesses.
export async function issueCode(canon: string) {
  let code = randomInt(0, 1_000_000).toString().padStart(6, '0')
  let challenge = randomBytes(16).toString('base64url')
  await withStore((s) =>
    s.saveCode(codeKey(canon), codeMac(canon, code), challenge),
  )
  return { code, challenge }
}

export async function checkCode(
  canon: string,
  challenge: string,
  code: string,
) {
  return withStore((s) =>
    s.checkCode(codeKey(canon), codeMac(canon, code), challenge),
  )
}

// Used when the code email fails to send, so a code nobody received can't be
// guessed at.
export async function deleteCode(canon: string) {
  await withStore((s) => s.deleteCode(codeKey(canon)))
}

// --- Passes ------------------------------------------------------------------

let tokenPattern = /^[A-Za-z0-9_-]{43}$/

// A 256-bit random token proving this address was verified. Only its SHA-256
// is stored; it lasts an hour so writing a long message doesn't outlive it.
export async function issuePass(canon: string) {
  let token = randomBytes(32).toString('base64url')
  await withStore((s) =>
    s.savePass(passKey(token), canon, passTtlSeconds, false),
  )
  return token
}

// Claims (reads and deletes, atomically) the pass and checks it belongs to the
// address being sent from. Taking it in one step means a burst of parallel
// submits can't turn one verification into several enquiries.
export async function claimPass(token: string, canon: string) {
  if (!tokenPattern.test(token)) return false
  let email = await withStore((s) => s.takePass(passKey(token)))
  return email === canon
}

// Puts a claimed pass back when the enquiry then couldn't be sent (rate limit
// or a Resend failure), so the visitor doesn't have to verify again. Best
// effort: failing here only means they verify once more.
export async function restorePass(token: string, canon: string) {
  try {
    await withStore((s) =>
      s.savePass(passKey(token), canon, restoredPassTtlSeconds, true),
    )
  } catch {
    // Already logged by withStore.
  }
}
