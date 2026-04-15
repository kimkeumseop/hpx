import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HSP 자가진단 테스트',
  description:
    '27문항으로 나의 감수성 지수를 알아보세요. 각 문항에 1(전혀 아니다)~5(매우 그렇다)로 응답하면 약 3분 내에 결과를 확인할 수 있습니다.',
  alternates: {
    canonical: 'https://hsp-key.kr/test',
  },
  openGraph: {
    title: 'HSP 자가진단 테스트 시작하기',
    description: '27문항으로 나의 감수성 지수를 알아보세요. 약 3분 소요.',
    url: 'https://hsp-key.kr/test',
  },
}

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
