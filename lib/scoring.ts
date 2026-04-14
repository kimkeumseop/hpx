import { questions, CATEGORY_LABELS, CATEGORY_QUESTION_COUNT, type Category } from './questions'

// ─── Types ────────────────────────────────────────────────────────────────────

export type HSPType = '깊은 바다형' | '숲속 관찰자형' | '반HSP형' | '비HSP형'

export interface CategoryScore {
  label: string
  raw: number      // 실제 합산 점수
  max: number      // 최대 가능 점수 (count × 5)
  normalized: number // 0~100 정규화
}

export interface ScoreResult {
  raw: number           // 원점수 (27~135)
  normalized: number    // 정규화 점수 (0~100)
  type: HSPType
  emoji: string
  tagline: string       // 짧은 한 줄 설명
  description: string   // 상세 설명
  percentile: string    // 예) "상위 5%"
  categories: Record<Category, CategoryScore>
}

// ─── Type metadata ────────────────────────────────────────────────────────────

const TYPE_META: Record<
  HSPType,
  { emoji: string; tagline: string; description: string; scoreRange: string }
> = {
  '깊은 바다형': {
    emoji: '🌊',
    tagline: '세상을 가장 깊이 느끼는 사람',
    scoreRange: '90~100점',
    description:
      '당신은 매우 높은 감수성을 지닌 깊은 바다형 HSP입니다. 세상의 아름다움과 고통을 동시에 풍부하게 느끼며, 타인이 쉽게 지나치는 세밀한 감정과 분위기를 포착합니다. 때로는 자극에 압도되어 지치기도 하지만, 그만큼 삶을 진하게 경험하는 능력을 타고났습니다. 혼자만의 회복 시간을 충분히 허용하면, 당신의 섬세함은 예술·공감·창의성에서 가장 강력한 강점이 됩니다.',
  },
  '숲속 관찰자형': {
    emoji: '🌿',
    tagline: '감수성과 균형을 모두 갖춘 사람',
    scoreRange: '70~89점',
    description:
      '당신은 뛰어난 감수성과 현실적 균형을 모두 갖춘 숲속 관찰자형 HSP입니다. 주변 환경과 사람들의 미묘한 감정 변화를 섬세하게 포착하며, 깊은 공감 능력을 바탕으로 의미 있는 관계를 만들어 갑니다. 혼자만의 충전 시간이 당신에게 꼭 필요하며, 그 시간이 당신의 감수성을 더욱 빛나게 합니다. 자신의 경계선을 인식하고 지키는 것이 지속적인 에너지의 열쇠입니다.',
  },
  '반HSP형': {
    emoji: '🌤',
    tagline: '상황에 따라 민감도가 달라지는 사람',
    scoreRange: '50~69점',
    description:
      '당신은 민감한 면과 유연한 면이 공존하는 반HSP형입니다. 특정 상황이나 영역에서는 높은 감수성을 발휘하지만, 다른 상황에서는 유연하게 적응하는 능력도 있습니다. 자신이 어떤 자극에 특히 민감한지 파악해 두면, 에너지를 효율적으로 관리하는 데 큰 도움이 됩니다. 민감한 부분을 억누르기보다 이해하는 것이 더 건강한 길입니다.',
  },
  '비HSP형': {
    emoji: '☀️',
    tagline: '강한 회복력과 유연성을 지닌 사람',
    scoreRange: '0~49점',
    description:
      '당신은 자극에 유연하게 반응하는 비HSP형입니다. 다양한 환경에서도 빠르게 적응하고, 강한 회복력을 가지고 있습니다. HSP의 특성이 적게 나타나지만, 이것은 당신만의 고유한 강점입니다. 분주한 환경에서 오히려 에너지를 얻는 타입으로, 다양한 자극 속에서 활발하게 활동할 수 있는 역량을 지니고 있습니다.',
  },
}

// ─── Scoring functions ────────────────────────────────────────────────────────

/**
 * 정규화 점수 0~100 계산
 * 공식: Math.round((raw - 27) / (135 - 27) * 100)
 */
export function normalizeScore(raw: number): number {
  return Math.round(((raw - 27) / (135 - 27)) * 100)
}

/**
 * 정규화 점수 → HSP 유형
 */
export function getHSPType(normalized: number): HSPType {
  if (normalized >= 90) return '깊은 바다형'
  if (normalized >= 70) return '숲속 관찰자형'
  if (normalized >= 50) return '반HSP형'
  return '비HSP형'
}

/**
 * 정규화 점수 → 백분위 문자열
 * 실제 정규분포 기반 근사치
 */
export function getPercentile(normalized: number): string {
  if (normalized >= 95) return '상위 3%'
  if (normalized >= 90) return '상위 5%'
  if (normalized >= 85) return '상위 8%'
  if (normalized >= 80) return '상위 12%'
  if (normalized >= 75) return '상위 17%'
  if (normalized >= 70) return '상위 23%'
  if (normalized >= 65) return '상위 30%'
  if (normalized >= 60) return '상위 38%'
  if (normalized >= 55) return '상위 46%'
  if (normalized >= 50) return '상위 54%'
  if (normalized >= 40) return '상위 65%'
  if (normalized >= 30) return '상위 75%'
  return '상위 85%'
}

/**
 * 카테고리별 점수 계산
 */
function calcCategoryScores(answers: number[]): Record<Category, CategoryScore> {
  const sums: Record<Category, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 }

  questions.forEach((q, i) => {
    sums[q.category] += answers[i]
  })

  const categories = {} as Record<Category, CategoryScore>

  ;(['A', 'B', 'C', 'D', 'E'] as Category[]).forEach((cat) => {
    const count = CATEGORY_QUESTION_COUNT[cat]
    const raw = sums[cat]
    const min = count        // 최솟값: 문항 수 × 1
    const max = count * 5    // 최댓값: 문항 수 × 5
    const normalized = Math.round(((raw - min) / (max - min)) * 100)

    categories[cat] = {
      label: CATEGORY_LABELS[cat],
      raw,
      max,
      normalized,
    }
  })

  return categories
}

/**
 * 메인 채점 함수
 * @param answers 27개 응답 배열 (각 1~5)
 * @returns ScoreResult
 */
export function calculateScore(answers: number[]): ScoreResult {
  if (answers.length !== 27) {
    throw new Error(`답변 수가 27개여야 합니다. 받은 수: ${answers.length}`)
  }

  const raw = answers.reduce((sum, a) => sum + a, 0)
  const normalized = normalizeScore(raw)
  const type = getHSPType(normalized)
  const meta = TYPE_META[type]

  return {
    raw,
    normalized,
    type,
    emoji: meta.emoji,
    tagline: meta.tagline,
    description: meta.description,
    percentile: getPercentile(normalized),
    categories: calcCategoryScores(answers),
  }
}

/** 결과 타입별 메타 정보 노출 (결과 미리보기 등에 사용) */
export { TYPE_META }
