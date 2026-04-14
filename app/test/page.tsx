'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { questions, TOTAL_QUESTIONS } from '@/lib/questions'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'

type Direction = 1 | -1

export default function TestPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL_QUESTIONS).fill(null))
  const [direction, setDirection] = useState<Direction>(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentIndex]
  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1

  const goToNext = useCallback(() => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setDirection(1)
      setCurrentIndex((i) => i + 1)
    }
  }, [currentIndex])

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((i) => i - 1)
    }
  }, [currentIndex])

  const handleAnswer = useCallback(
    (value: number) => {
      if (isTransitioning) return

      // 답변 저장
      setAnswers((prev) => {
        const next = [...prev]
        next[currentIndex] = value
        return next
      })

      // 마지막 문항이면 결과 페이지로
      if (isLastQuestion) {
        setIsTransitioning(true)
        const finalAnswers = [...answers]
        finalAnswers[currentIndex] = value

        // sessionStorage에 저장 후 이동
        setTimeout(() => {
          sessionStorage.setItem(
            'hsp_answers',
            JSON.stringify({
              answers: finalAnswers,
              completedAt: new Date().toISOString(),
            })
          )
          router.push('/result')
        }, 400)
        return
      }

      // 자동 이동 (짧은 딜레이로 선택 피드백 시간 확보)
      setIsTransitioning(true)
      setTimeout(() => {
        setDirection(1)
        setCurrentIndex((i) => i + 1)
        setIsTransitioning(false)
      }, 320)
    },
    [currentIndex, isLastQuestion, isTransitioning, answers, router]
  )

  const answeredCount = answers.filter((a) => a !== null).length

  return (
    <div className="min-h-screen bg-cream flex flex-col">

      {/* Progress bar — sticky top */}
      <ProgressBar current={answeredCount} total={TOTAL_QUESTIONS} />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-xl">

          {/* Question card with slide animation */}
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentIndex}
            totalCount={TOTAL_QUESTIONS}
            selectedAnswer={currentAnswer}
            direction={direction}
            onAnswer={handleAnswer}
          />

          {/* Navigation row */}
          <div className="mt-6 flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 text-sm font-bold text-lavender-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-lavender-700 transition-colors py-2 px-4 rounded-xl hover:bg-lavender-50 active:scale-95"
            >
              ← 이전
            </button>

            {/* Dot indicators (max 27 = overflow, show only nearby) */}
            <div className="flex items-center gap-1.5">
              {questions.map((_, i) => {
                const isActive = i === currentIndex
                const isAnswered = answers[i] !== null
                const isNear = Math.abs(i - currentIndex) <= 2

                if (!isNear && i !== 0 && i !== TOTAL_QUESTIONS - 1) {
                  if (i === currentIndex - 3 || i === currentIndex + 3) {
                    return (
                      <span key={i} className="text-gray-300 text-xs leading-none">
                        •
                      </span>
                    )
                  }
                  return null
                }

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1)
                      setCurrentIndex(i)
                    }}
                    className={[
                      'rounded-full transition-all duration-200',
                      isActive
                        ? 'w-5 h-2.5 gradient-brand'
                        : isAnswered
                        ? 'w-2 h-2 bg-lavender-400'
                        : 'w-2 h-2 bg-lavender-200',
                    ].join(' ')}
                    style={
                      isActive
                        ? { background: 'linear-gradient(90deg, #8B6FBB 0%, #6BBFB5 100%)' }
                        : {}
                    }
                    aria-label={`문항 ${i + 1}로 이동`}
                  />
                )
              })}
            </div>

            {/* Next / Submit button */}
            {isLastQuestion ? (
              <button
                onClick={() => currentAnswer !== null && handleAnswer(currentAnswer)}
                disabled={currentAnswer === null || isTransitioning}
                className="flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-lavender-500 to-mint-400 disabled:opacity-40 disabled:cursor-not-allowed py-2 px-5 rounded-xl shadow-lavender-sm hover:shadow-lavender-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                결과 보기 →
              </button>
            ) : (
              <button
                onClick={goToNext}
                disabled={currentAnswer === null}
                className="flex items-center gap-2 text-sm font-bold text-lavender-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-lavender-700 transition-colors py-2 px-4 rounded-xl hover:bg-lavender-50 active:scale-95"
              >
                다음 →
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Loading overlay when transitioning to result */}
      <AnimatePresence>
        {isTransitioning && isLastQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8B6FBB 0%, #6BBFB5 100%)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-6xl mb-4 animate-bounce">🌊</div>
              <p className="text-white font-black text-2xl mb-2">결과 분석 중...</p>
              <p className="text-white/80 text-sm">나의 감수성 유형을 확인하고 있어요</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
