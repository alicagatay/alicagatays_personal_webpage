import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import {
  getLocaleFromCountryCode,
  localeCookieName,
  routing,
} from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

function getCountryCode(request: NextRequest): string | null {
  return (
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('cloudfront-viewer-country') ||
    request.headers.get('x-country-code')
  )
}

let FILE_CONVENTION_PATHS = new Set([
  '/opengraph-image',
  '/twitter-image',
  '/apple-icon',
  '/icon',
])

export function proxy(request: NextRequest) {
  let pathname = request.nextUrl.pathname

  // Bypass Next.js metadata file conventions - they live at the root, not under [locale]
  if (FILE_CONVENTION_PATHS.has(pathname)) {
    return NextResponse.next()
  }

  let hasLocaleCookie = Boolean(request.cookies.get(localeCookieName))

  if (pathname === '/' && !hasLocaleCookie) {
    let locale = getLocaleFromCountryCode(getCountryCode(request))
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
