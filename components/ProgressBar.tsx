'use client'

interface ProgressBarProps {
  current: number  // 0-based current index
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const answered = current          // 현재 답변 완료된 수
  const pct = Math.round((answered / total) * 100)

  return (
    <div className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-b border-lavender-100 sticky top-0 z-20">
      <div className="max-w-xl mx-auto">

        {/* Label */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-lavender-500 tracking-[0.28em] uppercase">
            HSP 자가진단
          </span>
          <span className="text-xs font-bold text-gray-500">
            <span className="text-lavender-600">{Math.min(current + 1, total)}</span>
            <span className="text-gray-300 mx-1">/</span>
            {total}
          </span>
        </div>

        {/* Track */}
        <div className="w-full h-2 bg-lavender-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #8B6FBB 0%, #6BBFB5 100%)',
            }}
          />
        </div>

      </div>
    </div>
  )
}
