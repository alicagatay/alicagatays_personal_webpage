import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ali Cagatay - AI Engineer',
    short_name: 'Ali Cagatay',
    description:
      'Personal site of Ali Cagatay, AI engineer in Birmingham specialising in deep learning, computer vision, and agentic systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#18181b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
