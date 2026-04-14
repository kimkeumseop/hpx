'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { type Question, SCALE_LABELS, CATEGORY_LABELS } from '@/lib/questions'

interface QuestionCardProps {
  question: Question
  questionIndex: number       // 0-based
  totalCount: number
  selectedAnswer: number | null
  direction: 1 | -1           // 1 = 앞으로, -1 = 뒤로
  onAnswer: (value: number) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  A: 'bg-purple-100 text-purple-700',
  B: 'bg-rose-100 text-rose-700',
  C: 'bg-sky-100 text-sky-700',
  D: 'bg-amber-100 text-amber-700',
  E: 'bg-emerald-100 text-emerald-700',
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] },
  }),
}

export default function QuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  direction,
  onAnswer,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-lavender-lg border border-lavender-100 p-7 sm:p-9">

          {/* Category badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-5 ${CATEGORY_COLORS[question.category]}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {CATEGORY_LABELS[question.category]}
          </span>

          {/* Question text */}
          <p className="text-lg sm:text-xl font-bold text-[#2D2637] leading-relaxed mb-8">
            {question.text}
          </p>

          {/* Answer buttons */}
          <div className="flex flex-col gap-3">
            {([1, 2, 3, 4, 5] as const).map((val) => {
              const isSelected = selectedAnswer === val
              return (
                <button
                  key={val}
                  onClick={() => onAnswer(val)}
                  className={[
                    'answer-btn flex items-center gap-4',
                    isSelected ? 'answer-btn-selected' : '',
                  ].join(' ')}
                >
                  {/* Score indicator */}
                  <span
                    className={[
                      'flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-colors',
                      isSelected
                        ? 'bg-white/25 text-white'
                        : 'bg-lavender-50 text-lavender-500',
                    ].join(' ')}
                  >
                    {val}
                  </span>

                  {/* Label */}
                  <span className="flex-1 text-left text-sm sm:text-base">
                    {SCALE_LABELS[val]}
                  </span>

                  {/* Selected check */}
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-white text-xs font-black"
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Hint text */}
          <p className="mt-6 text-center text-xs text-gray-400">
            선택하면 자동으로 다음 문항으로 이동합니다
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
