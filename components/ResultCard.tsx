'use client'

import { forwardRef } from 'react'
import type { ScoreResult } from '@/lib/scoring'

interface ResultCardProps {
  result: ScoreResult
}

/**
 * 공유용 결과 카드 컴포넌트.
 * html2canvas로 캡처되므로 인라인 스타일 + 단순 CSS 사용.
 * ref를 통해 부모에서 캡처할 수 있습니다.
 */
const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(function ResultCard(
  { result },
  ref
) {
  const { type, emoji, normalized, tagline, categories } = result

  return (
    <div
      ref={ref}
      style={{
        width: '600px',
        height: '315px',
        background: 'linear-gradient(135deg, #8B6FBB 0%, #6BBFB5 100%)',
        borderRadius: '24px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }}
      />

      {/* Top: site name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>🗝️</span>
        <span style={{ fontSize: '14px', fontWeight: 900, opacity: 0.9, letterSpacing: '0.05em' }}>
          HSP Key
        </span>
      </div>

      {/* Center: type info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            flexShrink: 0,
          }}
        >
          {emoji}
        </div>
        <div>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 700,
              opacity: 0.75,
              marginBottom: '4px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            나의 HSP 유형
          </p>
          <p style={{ fontSize: '26px', fontWeight: 900, marginBottom: '4px', lineHeight: 1.2 }}>
            {type} HSP
          </p>
          <p style={{ fontSize: '14px', opacity: 0.85, fontWeight: 500 }}>{tagline}</p>
        </div>
      </div>

      {/* Bottom: scores + categories */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {/* Score */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '44px', fontWeight: 900, lineHeight: 1 }}>{normalized}</span>
          <span style={{ fontSize: '16px', fontWeight: 700, opacity: 0.8 }}>점</span>
          <span style={{ fontSize: '12px', opacity: 0.65, marginLeft: '6px' }}>
            {result.percentile}
          </span>
        </div>

        {/* Category mini bars */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
          {(Object.entries(categories) as [string, { label: string; normalized: number }][]).map(
            ([key, cat]) => (
              <div
                key={key}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
              >
                <div
                  style={{
                    width: '28px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.3)',
                    height: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${cat.normalized}%`,
                      background: 'rgba(255,255,255,0.7)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <span style={{ fontSize: '9px', opacity: 0.7, fontWeight: 700 }}>{key}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* URL watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '14px',
          right: '20px',
          fontSize: '10px',
          opacity: 0.5,
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        hsp-key.kr
      </div>
    </div>
  )
})

export default ResultCard
