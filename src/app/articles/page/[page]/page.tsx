import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

const ARTICLES_PER_PAGE = 10

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Thoughts',
  description:
    'Build Logs & Brain Dumps from a Software Engineer: Notes on Software, AI, and Everything in Between',
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

type PageProps = { params: { page: string } }

export default async function ArticlesPage({ params }: PageProps) {
  const page = parseInt(params.page, 10)
  if (isNaN(page) || page < 1) notFound()
  const articles = await getAllArticles()
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  if (page > totalPages) notFound()
  const start = (page - 1) * ARTICLES_PER_PAGE
  const end = start + ARTICLES_PER_PAGE
  const paginatedArticles = articles.slice(start, end)

  return (
    <SimpleLayout
      title="Build Logs & Brain Dumps from a Software Engineer: Notes on Software, AI, and Everything in Between"
      intro="A living archive of my experiences, experiments, and lessons in software engineering, artificial intelligence, and the creative mess in between."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {paginatedArticles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </SimpleLayout>
  )
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  return (
    <nav className="mt-8 flex justify-center gap-4">
      {currentPage > 1 && (
        <a
          href={`/articles/page/${currentPage - 1}`}
          className="rounded bg-zinc-200 px-3 py-1 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          Previous
        </a>
      )}
      <span className="px-3 py-1">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <a
          href={`/articles/page/${currentPage + 1}`}
          className="rounded bg-zinc-200 px-3 py-1 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          Next
        </a>
      )}
    </nav>
  )
}
