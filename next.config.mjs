import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  turbopack: {
    root: __dirname,
  },
  // The redesign collapses the old multi-page site into a single landing page.
  // 301 the retired routes (to the relevant anchor where one exists) so inbound
  // links and bookmarks keep their value.
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/work', destination: '/#work', permanent: true },
      { source: '/projects', destination: '/#projects', permanent: true },
      { source: '/education', destination: '/#education', permanent: true },
      { source: '/hackathons', destination: '/', permanent: true },
      { source: '/gear', destination: '/', permanent: true },
      { source: '/work-with-me', destination: '/#contact', permanent: true },
      // Old bilingual (next-intl) /en + /tr URLs Google still has indexed.
      { source: '/en/:path*', destination: '/', permanent: true },
      { source: '/tr/:path*', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
