import Link from '@/components/Link'
import { getTranslations } from 'next-intl/server'

import { ContainerInner, ContainerOuter } from '@/components/Container'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export async function Footer() {
  let t = await getTranslations('common')

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">{t('nav.about')}</NavLink>
                <NavLink href="/projects">{t('nav.projects')}</NavLink>
                <NavLink href="/writings">{t('nav.writings')}</NavLink>
                <NavLink href="/education">{t('nav.education')}</NavLink>
                <NavLink href="/work">{t('nav.work')}</NavLink>
                <NavLink href="/hackathons">{t('nav.hackathons')}</NavLink>
                <NavLink href="/gear">{t('nav.gear')}</NavLink>
                {/* <NavLink href="/work-with-me">Work With Me</NavLink> */}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
