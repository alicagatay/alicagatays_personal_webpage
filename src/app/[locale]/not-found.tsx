import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  let t = await getTranslations('common')

  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-zinc-500 dark:text-zinc-400">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          {t('notFound.description')}
        </p>
        <Button href="/" variant="secondary" className="mt-4">
          {t('notFound.goHome')}
        </Button>
      </div>
    </Container>
  )
}
