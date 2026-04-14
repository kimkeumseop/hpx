import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hsp-key.kr'),
  title: 'HSP 자가진단 테스트 | 나는 민감한 사람일까?',
  description:
    '27문항으로 알아보는 나의 감수성 지수. HSP 여부와 민감도 타입을 무료로 진단해보세요. 깊은 바다형·숲속 관찰자형·반HSP형·비HSP형 중 나는 어떤 유형일까요?',
  keywords: [
    'HSP',
    '고민감성',
    '자가진단',
    '감수성 테스트',
    '민감한 사람',
    'Highly Sensitive Person',
    'MBTI',
    '심리테스트',
  ],
  authors: [{ name: 'HSP Key' }],
  creator: 'HSP Key',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://hsp-key.kr',
    siteName: 'HSP Key',
    title: 'HSP 자가진단 테스트 | 나는 민감한 사람일까?',
    description:
      '27문항으로 알아보는 나의 감수성 지수. HSP 여부와 민감도 타입을 무료로 진단해보세요.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'HSP 자가진단 테스트',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HSP 자가진단 테스트 | 나는 민감한 사람일까?',
    description: '27문항으로 알아보는 나의 감수성 지수.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8B6FBB',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'HSP란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HSP(Highly Sensitive Person, 고감수성인)는 심리학자 일레인 아론 박사가 1990년대에 정의한 개념으로, 전체 인구의 약 15~20%에 해당합니다. 감각 자극에 더 민감하게 반응하고, 감정을 깊이 처리하며, 타인의 기분을 쉽게 흡수하는 특성을 가집니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'HSP는 장애나 질병인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HSP는 장애나 질병이 아닙니다. 신경계의 특성으로, 더 깊이 처리하고 느끼는 타고난 기질입니다. 동물계 전반에서도 관찰되는 자연스러운 특성으로, 적절한 환경에서는 오히려 강점이 됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'HSP 자가진단 테스트는 얼마나 걸리나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '27문항으로 구성되며 약 3분 내외가 소요됩니다. 각 문항에 1(전혀 아니다)~5(매우 그렇다)로 응답하면 됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'HSP 점수가 높으면 나쁜 건가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '점수가 높다고 나쁜 것이 아닙니다. 높은 감수성은 공감 능력, 예술적 감각, 세밀한 관찰력 등의 강점으로 이어질 수 있습니다. 중요한 것은 자신의 특성을 이해하고 적절히 관리하는 것입니다.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-pretendard bg-cream min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
