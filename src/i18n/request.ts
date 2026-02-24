import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import {
  defaultLocale,
  getLocaleFromCountryCode,
  isLocale,
  localeCookieName,
} from '@/i18n/routing'

function getCountryCodeFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-vercel-ip-country') ||
    headerStore.get('cf-ipcountry') ||
    headerStore.get('cloudfront-viewer-country') ||
    headerStore.get('x-country-code')
  )
}

export default getRequestConfig(async () => {
  let cookieStore = cookies()
  let headerStore = headers()

  let cookieLocale = cookieStore.get(localeCookieName)?.value
  let locationLocale = getLocaleFromCountryCode(
    getCountryCodeFromHeaders(headerStore),
  )

  let locale = isLocale(cookieLocale) ? cookieLocale : locationLocale

  if (!isLocale(locale)) {
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
