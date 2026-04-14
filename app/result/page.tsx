'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { calculateScore, type ScoreResult } from '@/lib/scoring'
import { saveResult } from '@/lib/firebase'
import ResultCard from '@/components/ResultCard'
import AdSlot from '@/components/AdSlot'

// Recharts — SSR 비활성화
const RadarChart = dynamic(
  () => import('recharts').then((m) => ({ default: m.RadarChart })),
  { ssr: false }
)
const Radar = dynamic(
  () => import('recharts').then((m) => ({ default: m.Radar })),
  { ssr: false }
)
const PolarGrid = dynamic(
  () => import('recharts').then((m) => ({ default: m.PolarGrid })),
  { ssr: false }
)
const PolarAngleAxis = dynamic(
  () => import('recharts').then((m) => ({ default: m.PolarAngleAxis })),
  { ssr: false }
)
const ResponsiveContainer = dynamic(
  () => import('recharts').then((m) => ({ default: m.ResponsiveContainer })),
  { ssr: false }
)

// ─── Category bar component ───────────────────────────────────────────────────

function CategoryBar({
  label,
  normalized,
  delay,
}: {
  label: string
  normalized: number
  delay: number
}) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(normalized), delay)
    return () => clearTimeout(t)
  }, [normalized, delay])

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-[#2D2637]">{label}</span>
        <span className="text-sm font-bold text-lavender-500">{normalized}점</span>
      </div>
      <div className="w-full h-2.5 bg-lavender-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #8B6FBB 0%, #6BBFB5 100%)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ResultPage() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [result, setResult] = useState<ScoreResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [copyDone, setCopyDone] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [hasNativeShare, setHasNativeShare] = useState(false)
  const savedRef = useRef(false)

  // ── Detect native share support (client-only) ──────────────────────────────
  useEffect(() => {
    setHasNativeShare('share' in navigator)
  }, [])

  // ── Load result from sessionStorage ────────────────────────────────────────
  useEffect(() => {
    const raw = sessionStorage.getItem('hsp_answers')
    if (!raw) {
      router.replace('/test')
      return
    }

    try {
      const { answers } = JSON.parse(raw) as { answers: number[]; completedAt: string }
      const scored = calculateScore(answers)
      setResult(scored)
    } catch {
      router.replace('/test')
    }
  }, [router])

  // ── Save to Firestore (once) ────────────────────────────────────────────────
  useEffect(() => {
    if (!result || savedRef.current) return
    savedRef.current = true

    setIsSaving(true)
    saveResult({
      type: result.type,
      score: result.raw,
      normalized: result.normalized,
      timestamp: new Date(),
    }).finally(() => setIsSaving(false))
  }, [result])

  // ── Share: Download image ───────────────────────────────────────────────────
  const handleDownload = useCallback(async () => {
    if (!cardRef.current || !result) return
    setDownloading(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      })
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `hsp-result-${result.type}.png`
      link.href = url
      link.click()
    } catch (err) {
      console.error('이미지 저장 실패:', err)
    } finally {
      setDownloading(false)
    }
  }, [result])

  // ── Share: Kakao ─────────────────────────────────────────────────────────────
  const handleKakaoShare = useCallback(() => {
    if (!result) return
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY

    if (!kakaoKey) {
      alert('카카오 앱 키가 설정되지 않았습니다.')
      return
    }

    const Kakao = (window as unknown as { Kakao: KakaoSDK }).Kakao
    if (!Kakao) {
      alert('카카오 SDK를 불러올 수 없습니다.')
      return
    }

    if (!Kakao.isInitialized()) {
      Kakao.init(kakaoKey)
    }

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `나는 ${result.type} HSP ${result.emoji}`,
        description: `${result.tagline} · ${result.normalized}점 · ${result.percentile}`,
        imageUrl: 'https://hsp-key.kr/og-default.png',
        link: {
          mobileWebUrl: 'https://hsp-key.kr',
          webUrl: 'https://hsp-key.kr',
        },
      },
      buttons: [
        {
          title: '나도 테스트하기',
          link: {
            mobileWebUrl: 'https://hsp-key.kr',
            webUrl: 'https://hsp-key.kr',
          },
        },
      ],
    })
  }, [result])

  // ── Share: Copy link ──────────────────────────────────────────────────────
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('https://hsp-key.kr')
      setCopyDone(true)
      setTimeout(() => setCopyDone(false), 2000)
    } catch {
      prompt('링크를 복사하세요:', 'https://hsp-key.kr')
    }
  }, [])

  // ── Share: Native share (mobile) ──────────────────────────────────────────
  const handleNativeShare = useCallback(async () => {
    if (!result || !navigator.share) return
    await navigator.share({
      title: `나는 ${result.type} HSP ${result.emoji}`,
      text: `HSP 자가진단 결과: ${result.type} HSP · ${result.normalized}점 · ${result.percentile}`,
      url: 'https://hsp-key.kr',
    })
  }, [result])

  // ─── Radar chart data ────────────────────────────────────────────────────
  const radarData = result
    ? Object.entries(result.categories).map(([, cat]) => ({
        subject: cat.label.replace(' ', '\n'),
        score: cat.normalized,
        fullMark: 100,
      }))
    : []

  // ─── Type color theme ────────────────────────────────────────────────────
  const typeColors: Record<string, { from: string; to: string; light: string }> = {
    '깊은 바다형':   { from: '#8B6FBB', to: '#6BBFB5', light: '#f5f0ff' },
    '숲속 관찰자형': { from: '#5aafa5', to: '#6BBFB5', light: '#f0fdfb' },
    '반HSP형':       { from: '#60a5fa', to: '#7dd3fc', light: '#eff6ff' },
    '비HSP형':       { from: '#fbbf24', to: '#f59e0b', light: '#fffbeb' },
  }
  const theme = result ? (typeColors[result.type] ?? typeColors['깊은 바다형']) : typeColors['깊은 바다형']

  // ─── Loading skeleton ────────────────────────────────────────────────────
  if (!result) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">🌊</div>
          <p className="text-lavender-500 font-bold">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-lavender-100 px-5 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🗝️</span>
            <span className="font-black text-lavender-600 text-sm">HSP Key</span>
          </Link>
          <span className="text-xs text-gray-400">{isSaving ? '저장 중...' : '결과 저장됨'}</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 py-8 space-y-6">

        {/* ── Top Ad banner ──────────────────────────────────────────── */}
        <AdSlot format="banner" slot="YOUR_BANNER_SLOT_ID" />

        {/* ── Type hero card ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] overflow-hidden shadow-lavender-lg"
          style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
        >
          <div className="relative px-7 pt-8 pb-7 text-white overflow-hidden">
            {/* bg deco */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/08" />

            <p className="text-white/70 font-bold text-xs tracking-[0.28em] uppercase mb-4">
              나의 HSP 유형
            </p>

            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl flex-shrink-0 shadow-lg">
                {result.emoji}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-1">
                  {result.type} HSP
                </h1>
                <p className="text-white/85 text-sm font-medium">{result.tagline}</p>
              </div>
            </div>

            {/* Score row */}
            <div className="flex items-center gap-4 bg-white/15 rounded-2xl px-5 py-4">
              <div className="text-center flex-1">
                <p className="text-3xl font-black">{result.normalized}</p>
                <p className="text-white/70 text-xs font-bold mt-0.5">감수성 점수</p>
              </div>
              <div className="w-px h-10 bg-white/25" />
              <div className="text-center flex-1">
                <p className="text-xl font-black">{result.percentile}</p>
                <p className="text-white/70 text-xs font-bold mt-0.5">민감도 순위</p>
              </div>
              <div className="w-px h-10 bg-white/25" />
              <div className="text-center flex-1">
                <p className="text-xl font-black">{result.raw}</p>
                <p className="text-white/70 text-xs font-bold mt-0.5">원점수</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Description ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-[2rem] border border-lavender-100 shadow-lavender-sm p-7"
        >
          <h2 className="font-black text-[#2D2637] text-lg mb-4">
            {result.emoji} {result.type} 유형이란?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {result.description}
          </p>
        </motion.div>

        {/* ── Category Analysis ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-[2rem] border border-lavender-100 shadow-lavender-sm p-7"
        >
          <h2 className="font-black text-[#2D2637] text-lg mb-6">카테고리별 분석</h2>

          {/* Radar chart */}
          <div className="w-full h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#e9d5ff" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }}
                />
                <Radar
                  name="감수성"
                  dataKey="score"
                  stroke={theme.from}
                  fill={theme.from}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar charts per category */}
          <div className="flex flex-col gap-4">
            {Object.entries(result.categories).map(([, cat], i) => (
              <CategoryBar
                key={cat.label}
                label={cat.label}
                normalized={cat.normalized}
                delay={300 + i * 100}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Share card ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-[2rem] border border-lavender-100 shadow-lavender-sm p-7"
        >
          <h2 className="font-black text-[#2D2637] text-lg mb-2">결과 공유하기</h2>
          <p className="text-gray-500 text-sm mb-6">나의 HSP 유형을 친구에게 공유해보세요</p>

          {/* Card preview (capture target) */}
          <div className="flex justify-center mb-6 overflow-hidden">
            <div className="transform scale-[0.85] sm:scale-100 origin-top">
              <ResultCard ref={cardRef} result={result} />
            </div>
          </div>

          {/* Share buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border border-lavender-200 bg-white hover:bg-lavender-50 hover:border-lavender-400 hover:shadow-lavender-sm active:scale-95 transition-all text-center disabled:opacity-50"
            >
              <span className="text-xl">{downloading ? '⏳' : '💾'}</span>
              <span className="text-xs font-bold text-gray-600">
                {downloading ? '저장 중...' : '이미지 저장'}
              </span>
            </button>

            {/* Kakao */}
            <button
              onClick={handleKakaoShare}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 hover:shadow-sm active:scale-95 transition-all"
            >
              <span className="text-xl">💬</span>
              <span className="text-xs font-bold text-yellow-700">카카오 공유</span>
            </button>

            {/* Native share (mobile) */}
            {hasNativeShare && (
              <button
                onClick={handleNativeShare}
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border border-mint-300 bg-white hover:bg-mint-300/10 hover:border-mint-400 hover:shadow-mint-glow active:scale-95 transition-all"
              >
                <span className="text-xl">↗️</span>
                <span className="text-xs font-bold text-mint-500">공유하기</span>
              </button>
            )}

            {/* Copy link (always shown) */}
            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border border-lavender-200 bg-white hover:bg-lavender-50 hover:border-lavender-400 hover:shadow-lavender-sm active:scale-95 transition-all"
            >
              <span className="text-xl">{copyDone ? '✅' : '📋'}</span>
              <span className="text-xs font-bold text-gray-600">
                {copyDone ? '복사됨!' : '링크 복사'}
              </span>
            </button>
          </div>
        </motion.div>

        {/* ── Bottom ad ──────────────────────────────────────────────── */}
        <div className="flex justify-center">
          <AdSlot format="rectangle" slot="YOUR_RECTANGLE_SLOT_ID" />
        </div>

        {/* ── Retry button ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pb-8"
        >
          <Link
            href="/test"
            onClick={() => sessionStorage.removeItem('hsp_answers')}
            className="inline-flex items-center gap-2 py-4 px-8 rounded-2xl border-2 border-lavender-300 text-lavender-600 font-bold hover:bg-lavender-50 hover:border-lavender-500 hover:shadow-lavender-sm active:scale-98 transition-all"
          >
            🔄 다시 테스트하기
          </Link>
          <p className="mt-3 text-xs text-gray-400">
            결과는 익명으로 저장되며 개인정보는 수집하지 않습니다
          </p>
        </motion.div>

      </main>

      {/* Kakao SDK — next/script으로 로드 */}
      {process.env.NEXT_PUBLIC_KAKAO_APP_KEY && (
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
    </div>
  )
}

// Kakao SDK type stub
interface KakaoSDK {
  init: (key: string) => void
  isInitialized: () => boolean
  Share: {
    sendDefault: (options: Record<string, unknown>) => void
  }
}
