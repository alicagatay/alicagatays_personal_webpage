import { Feed } from 'feed'

import { getSiteUrl } from '@/lib/site-url'
import { getAllWritings } from '@/lib/writings'

export async function GET() {
  let siteUrl = getSiteUrl()
  let writings = await getAllWritings()

  let feed = new Feed({
    title: 'Ali Cagatay - Writings',
    description:
      'Occasional writings by Ali Cagatay on AI, software engineering, and bits of tech that caught his eye.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} Ali Cagatay. All rights reserved.`,
    updated: new Date(),
    feedLinks: {
      rss: `${siteUrl}/feed.xml`,
    },
    author: {
      name: 'Ali Cagatay',
      link: siteUrl,
    },
  })

  for (let writing of writings) {
    let postUrl = `${siteUrl}/writings/${writing.slug}`
    feed.addItem({
      title: writing.frontmatter.title,
      id: postUrl,
      link: postUrl,
      description: writing.frontmatter.description,
      date: new Date(writing.frontmatter.date),
      author: [
        {
          name: writing.frontmatter.author ?? 'Ali Cagatay',
          link: siteUrl,
        },
      ],
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
