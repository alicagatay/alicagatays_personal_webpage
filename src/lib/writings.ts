import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

let writingsDir = path.join(process.cwd(), 'src/content/writings')

export type WritingFrontmatter = {
  title: string
  description: string
  date: string
  author?: string
}

export type Writing = {
  slug: string
  frontmatter: WritingFrontmatter
  content: string
}

async function readWritingsDir() {
  try {
    return await fs.readdir(writingsDir)
  } catch {
    return []
  }
}

export async function getAllWritings(): Promise<Writing[]> {
  let files = await readWritingsDir()
  let writings: Writing[] = []

  for (let file of files) {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue
    let slug = file.replace(/\.mdx?$/, '')
    let writing = await getWriting(slug)
    if (writing) writings.push(writing)
  }

  writings.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  )

  return writings
}

export async function getWriting(slug: string): Promise<Writing | null> {
  let mdxPath = path.join(writingsDir, `${slug}.mdx`)
  let mdPath = path.join(writingsDir, `${slug}.md`)

  let raw: string
  try {
    raw = await fs.readFile(mdxPath, 'utf8')
  } catch {
    try {
      raw = await fs.readFile(mdPath, 'utf8')
    } catch {
      return null
    }
  }

  let parsed = matter(raw)
  return {
    slug,
    frontmatter: parsed.data as WritingFrontmatter,
    content: parsed.content,
  }
}

export async function getWritingSlugs(): Promise<string[]> {
  let files = await readWritingsDir()
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}
