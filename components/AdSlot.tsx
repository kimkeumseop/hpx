'use client'

import { useEffect, useRef } from 'react'

type AdFormat = 'banner' | 'rectangle'

interface AdSlotProps {
  format: AdFormat
  slot: string          // AdSense ad slot ID (e.g. "1234567890")
  className?: string
}

/**
 * Google AdSense 광고 슬롯 컴포넌트.
 *
 * 사용 전 layout.tsx <head>에 AdSense 스크립트를 추가하세요:
 *   <script
 *     async
 *     src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
 *     crossOrigin="anonymous"
 *   />
 *
 * format:
 *   'banner'    → 728x90 (데스크탑) / 320x50 (모바일) 반응형
 *   'rectangle' → 336x280
 */
export default function AdSlot({ format, slot, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null)
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  useEffect(() => {
    if (!publisherId || !adRef.current) return

    try {
      // AdSense 광고 푸시
      ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []
      ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({})
    } catch {
      // AdSense 미설정 시 무시
    }
  }, [publisherId])

  // Publisher ID가 없으면 플레이스홀더 표시
  if (!publisherId) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-2xl text-gray-400 text-xs font-medium ${
          format === 'banner' ? 'h-[50px] sm:h-[90px] w-full' : 'h-[280px] w-[336px] max-w-full'
        } ${className}`}
      >
        광고 영역
      </div>
    )
  }

  if (format === 'banner') {
    return (
      <div className={`flex justify-center overflow-hidden ${className}`}>
        {/* 모바일: 320×50 */}
        <ins
          ref={adRef}
          className="adsbygoogle block sm:hidden"
          style={{ display: 'block', width: '320px', height: '50px' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format="fixed"
        />
        {/* 데스크탑: 728×90 */}
        <ins
          className="adsbygoogle hidden sm:block"
          style={{ display: 'block', width: '728px', height: '90px' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format="fixed"
        />
      </div>
    )
  }

  // rectangle: 336×280
  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '336px', height: '280px' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="fixed"
      />
    </div>
  )
}
