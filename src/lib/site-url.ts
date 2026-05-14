let DEFAULT_SITE_URL = 'https://alicagatay.xyz'

export function getSiteUrl(): string {
  let raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return DEFAULT_SITE_URL
  let withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/$/, '')
}
