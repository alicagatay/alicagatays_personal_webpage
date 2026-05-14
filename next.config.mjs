import { fileURLToPath } from 'url'
import { dirname } from 'path'
import createNextIntlPlugin from 'next-intl/plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  turbopack: {
    root: __dirname,
  },
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl(nextConfig)
