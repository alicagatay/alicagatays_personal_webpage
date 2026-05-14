import type { MetadataRoute } from 'next'

import { locales } from '@/i18n/routing'
import { getSiteUrl } from '@/lib/site-url'
import { getAllWritings } from '@/lib/writings'

let siteUrl = getSiteUrl()

let routes: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/work', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/writings', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/education', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/hackathons', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/gear', changeFrequency: 'yearly', priority: 0.5 },
]

function buildLanguages(path: string): Record<string, string> {
  let languages: Record<string, string> = {}
  for (let locale of locales) {
    languages[locale === 'en' ? 'en-GB' : 'tr-TR'] =
      `${siteUrl}/${locale}${path}`
  }
  languages['x-default'] = `${siteUrl}/en${path}`
  return languages
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let now = new Date()
  let entries: MetadataRoute.Sitemap = []

  for (let route of routes) {
    for (let locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: buildLanguages(route.path) },
      })
    }
  }

  let writings = await getAllWritings()
  for (let writing of writings) {
    let path = `/writings/${writing.slug}`
    let lastModified = new Date(writing.frontmatter.date)
    for (let locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.7,
        alternates: { languages: buildLanguages(path) },
      })
    }
  }

  return entries
}
