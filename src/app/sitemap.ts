import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/site-url'
import { getAllWritings } from '@/lib/writings'

let siteUrl = getSiteUrl()

let routes: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/writings', changeFrequency: 'weekly', priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let now = new Date()
  let entries: MetadataRoute.Sitemap = []

  for (let route of routes) {
    entries.push({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  }

  let writings = await getAllWritings()
  for (let writing of writings) {
    entries.push({
      url: `${siteUrl}/writings/${writing.slug}`,
      lastModified: new Date(writing.frontmatter.date),
      changeFrequency: 'yearly',
      priority: 0.7,
    })
  }

  return entries
}
