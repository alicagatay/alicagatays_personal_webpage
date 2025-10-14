import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
  published?: boolean // Optional: defaults to true for backward compatibility
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/thought-log/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/thought-log',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  // Filter out unpublished articles (only show if published is true or undefined)
  let publishedArticles = articles.filter(
    (article) => article.published !== false,
  )

  return publishedArticles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
