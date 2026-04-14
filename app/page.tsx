import Link from 'next/link'
import { TYPE_META } from '@/lib/scoring'

const typePreviewList = [
  { type: '깊은 바다형', emoji: '🌊', score: '90~100점', color: 'from-lavender-400 to-lavender-600' },
  { type: '숲속 관찰자형', emoji: '🌿', score: '70~89점', color: 'from-mint-400 to-mint-600' },
  { type: '반HSP형', emoji: '🌤', score: '50~69점', color: 'from-sky-300 to-sky-500' },
  { type: '비HSP형', emoji: '☀️', score: '0~49점', color: 'from-amber-300 to-amber-500' },
] as const

const features = [
  { icon: '🔬', title: '검증된 27문항', desc: '일레인 아론 박사의 HSP 연구를 기반으로 제작된 27개 문항' },
  { icon: '📊', title: '5가지 카테고리 분석', desc: '감각·감정·공감·과부하·처리 깊이를 레이더 차트로 시각화' },
  { icon: '🎨', title: '4가지 결과 유형', desc: '나의 감수성 패턴에 맞는 유형과 맞춤형 설명 제공' },
  { icon: '📱', title: '결과 카드 공유', desc: '결과를 이미지로 저장하거나 카카오톡·링크로 공유' },
]

const faqs = [
  {
    q: 'HSP란 무엇인가요?',
    a: 'HSP(Highly Sensitive Person)는 심리학자 일레인 아론 박사가 정의한 개념으로, 인구의 약 15~20%에 해당합니다. 감각 자극에 민감하게 반응하고, 감정을 깊이 처리하는 신경계 특성입니다.',
  },
  {
    q: 'HSP는 병이나 장애인가요?',
    a: '아닙니다. HSP는 진단명이 아니라 타고난 기질·특성입니다. 동물계 전반에서도 관찰되며, 적절한 환경에서는 강점으로 발휘됩니다.',
  },
  {
    q: '테스트 결과가 정확한가요?',
    a: '이 테스트는 자가진단 도구로, 전문적인 심리 평가를 대체하지 않습니다. 자신의 특성을 탐색하는 참고 자료로 활용하세요.',
  },
  {
    q: '점수가 높으면 나쁜 건가요?',
    a: '높은 감수성은 공감 능력, 예술적 감각, 세밀한 관찰력의 원천입니다. 어느 유형이든 자신의 특성을 이해하고 활용하는 것이 중요합니다.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-20 pb-16 overflow-hidden">

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-32 -left-32 w-80 h-80 rounded-full bg-lavender-200 opacity-40 blur-3xl" />
          <div className="blob-delayed absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-mint-300 opacity-30 blur-3xl" />
          <div className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lavender-100 opacity-20 blur-3xl" />
        </div>

        {/* Logo header */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-2xl">🗝️</span>
          <span className="font-black text-lavender-600 tracking-tight text-lg">HSP Key</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-lavender-200 rounded-full px-4 py-2 text-sm font-bold text-lavender-600 mb-8 shadow-lavender-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lavender-500" />
            </span>
            무료 · 3분 · 27문항
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4 text-[#2D2637]">
            나는{' '}
            <span className="gradient-brand-text">민감한 사람</span>
            일까?
          </h1>

          <p className="text-lg sm:text-xl font-medium text-gray-600 mb-3 leading-relaxed">
            HSP 자가진단 테스트
          </p>

          <p className="text-base text-gray-500 leading-relaxed mb-10 max-w-sm mx-auto">
            27문항으로 알아보는 나의 감수성 지수.<br />
            HSP 여부와 민감도 유형을 무료로 확인해보세요.
          </p>

          <Link
            href="/test"
            className="inline-flex items-center gap-3 gradient-brand text-white font-bold text-lg py-4 px-10 rounded-2xl shadow-lavender-md hover:shadow-lavender-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            지금 테스트하기
            <span className="text-xl">→</span>
          </Link>

          <p className="mt-4 text-sm text-gray-400">개인정보 수집 없음 · 결과는 익명으로 저장됩니다</p>
        </div>

        {/* Type icons floating */}
        <div className="relative z-10 mt-14 grid grid-cols-4 gap-3 sm:gap-6 max-w-sm sm:max-w-lg mx-auto">
          {typePreviewList.map(({ emoji, type, score }) => (
            <div
              key={type}
              className="flex flex-col items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-lavender-100 rounded-2xl p-3 sm:p-4 shadow-lavender-sm hover:-translate-y-1 transition-transform duration-200"
            >
              <span className="text-2xl sm:text-3xl">{emoji}</span>
              <span className="text-[10px] sm:text-xs font-bold text-lavender-600 text-center leading-tight">{type}</span>
              <span className="text-[9px] sm:text-[10px] text-gray-400">{score}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-[#2D2637] mb-3">
            이 테스트가 특별한 이유
          </h2>
          <p className="text-center text-gray-500 mb-12 text-sm sm:text-base">
            단순한 결과 유형을 넘어, 나의 감수성 패턴을 깊이 이해합니다
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-[2rem] bg-cream border border-lavender-100 shadow-lavender-sm hover:shadow-lavender-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#2D2637] mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Type Preview ──────────────────────────────────────────── */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-[#2D2637] mb-3">
            4가지 HSP 유형
          </h2>
          <p className="text-center text-gray-500 mb-12 text-sm sm:text-base">
            나는 어떤 유형에 가장 가까울까요?
          </p>

          <div className="flex flex-col gap-4">
            {typePreviewList.map(({ type, emoji, score }) => {
              const meta = TYPE_META[type as keyof typeof TYPE_META]
              return (
                <div
                  key={type}
                  className="glass-card rounded-[2rem] p-6 flex gap-5 items-start hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-2xl shadow-lavender-sm">
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-black text-[#2D2637]">{type} HSP</span>
                      <span className="text-xs font-bold text-lavender-500 bg-lavender-50 border border-lavender-200 px-2 py-0.5 rounded-full">
                        {score}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {meta.tagline}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="py-16 px-5">
        <div className="max-w-xl mx-auto text-center">
          <div className="gradient-brand rounded-[2rem] p-10 shadow-lavender-lg">
            <p className="text-white/80 font-bold text-sm mb-2 tracking-[0.28em] uppercase">무료 테스트</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
              지금 바로 확인해보세요
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8 leading-relaxed">
              3분이면 충분합니다.<br />
              나의 감수성 지수와 유형을 지금 알아보세요.
            </p>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 bg-white text-lavender-600 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              테스트 시작하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-[#2D2637] mb-12">
            자주 묻는 질문
          </h2>

          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-cream rounded-2xl border border-lavender-100 p-6 cursor-pointer"
              >
                <summary className="flex items-start justify-between gap-3 font-bold text-[#2D2637] list-none">
                  <span>{q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-brand text-white flex items-center justify-center text-sm transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-10 px-5 text-center border-t border-lavender-100">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">🗝️</span>
          <span className="font-black text-lavender-600">HSP Key</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
          이 테스트는 자가진단 참고 도구이며, 전문적인 심리 평가를 대체하지 않습니다.
          <br />© 2025 HSP Key. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
