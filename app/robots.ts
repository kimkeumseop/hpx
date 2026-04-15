import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/result',
    },
    sitemap: 'https://hsp-key.kr/sitemap.xml',
  }
}
