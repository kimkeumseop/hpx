import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '나의 HSP 유형 결과',
  description:
    'HSP 자가진단 결과를 확인하세요. 깊은 바다형·숲속 관찰자형·반HSP형·비HSP형 중 나는 어떤 유형인지 카테고리별 분석과 함께 알아보세요.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
