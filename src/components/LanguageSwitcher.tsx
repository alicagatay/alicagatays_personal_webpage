'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { localeCookieName, type Locale, locales } from '@/i18n/routing'

function LanguageIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  let t = useTranslations('common')
  let locale = useLocale() as Locale
  let router = useRouter()

  let languageLabels: Record<Locale, string> = {
    en: t('language.english'),
    tr: t('language.turkish'),
  }

  function setLocale(nextLocale: Locale, close: () => void) {
    if (nextLocale === locale) {
      close()
      return
    }

    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`
    router.refresh()
    close()
  }

  return (
    <Popover className={clsx('relative', mobile && 'w-full')}>
      {({ close }) => (
        <>
          <Popover.Button
            type="button"
            aria-label={t('language.toggle')}
            className={clsx(
              'group inline-flex items-center justify-center gap-1 rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
              mobile && 'flex w-full items-center justify-center gap-2',
            )}
          >
            <span className="sr-only">{t('language.toggle')}</span>
            <LanguageIcon className="h-6 w-6 text-zinc-500 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
            <span
              className={clsx(
                'text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200',
                !mobile && 'ml-1',
              )}
            >
              {locale}
            </span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-100 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={clsx(
                'absolute z-50 mt-2 w-40 rounded-2xl bg-white/95 p-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/95 dark:ring-white/10',
                mobile ? 'left-1/2 -translate-x-1/2' : 'right-0',
              )}
            >
              <p className="px-2 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t('language.title')}
              </p>
              <ul className="mt-1 space-y-1">
                {locales.map((supportedLocale) => {
                  let isActive = supportedLocale === locale
                  return (
                    <li key={supportedLocale}>
                      <button
                        type="button"
                        onClick={() => setLocale(supportedLocale, close)}
                        className={clsx(
                          'flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition',
                          isActive
                            ? 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300'
                            : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700/50',
                        )}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span>{languageLabels[supportedLocale]}</span>
                        {isActive && <span>✓</span>}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
