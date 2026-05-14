import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'tr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
export const localeCookieName = 'NEXT_LOCALE'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
  localeCookie: {
    name: localeCookieName,
  },
})

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function getLocaleFromAcceptLanguage(
  acceptLanguage: string | null,
): Locale {
  if (!acceptLanguage) {
    return defaultLocale
  }

  let preferredLocales = acceptLanguage
    .split(',')
    .map((item) => item.trim().toLowerCase().split(';')[0])

  for (let preferredLocale of preferredLocales) {
    if (preferredLocale.startsWith('tr')) {
      return 'tr'
    }

    if (preferredLocale.startsWith('en')) {
      return 'en'
    }
  }

  return defaultLocale
}

export function getLocaleFromCountryCode(countryCode: string | null): Locale {
  if (!countryCode) {
    return defaultLocale
  }

  return countryCode.trim().toUpperCase() === 'TR' ? 'tr' : 'en'
}
