export type Category = 'A' | 'B' | 'C' | 'D' | 'E'

export interface Question {
  id: number
  text: string
  category: Category
}

export const CATEGORY_LABELS: Record<Category, string> = {
  A: '감각 민감도',
  B: '감정 깊이',
  C: '타인 감정 흡수',
  D: '과부하 민감도',
  E: '자극 처리 깊이',
}

export const CATEGORY_QUESTION_COUNT: Record<Category, number> = {
  A: 6,
  B: 6,
  C: 5,
  D: 5,
  E: 5,
}

export const SCALE_LABELS: Record<number, string> = {
  1: '전혀 아니다',
  2: '아니다',
  3: '보통이다',
  4: '그렇다',
  5: '매우 그렇다',
}

export const questions: Question[] = [
  // ─── 카테고리 A: 감각 민감도 (6문항) ───────────────────────────────
  {
    id: 1,
    text: '큰 소음이나 혼잡한 공간에서 쉽게 압도된다.',
    category: 'A',
  },
  {
    id: 2,
    text: '카페 BGM이 크면 대화에 집중하기 어렵다.',
    category: 'A',
  },
  {
    id: 3,
    text: '밝은 조명이나 강한 냄새에 쉽게 불편함을 느낀다.',
    category: 'A',
  },
  {
    id: 4,
    text: '옷의 질감이나 태그가 신경 쓰일 때가 있다.',
    category: 'A',
  },
  {
    id: 5,
    text: '카페인에 민감하게 반응한다.',
    category: 'A',
  },
  {
    id: 6,
    text: '배고프거나 피곤하면 감정 기복이 심해진다.',
    category: 'A',
  },

  // ─── 카테고리 B: 감정 깊이 (6문항) ─────────────────────────────────
  {
    id: 7,
    text: '영화나 광고를 보다가 갑자기 울컥한 적이 있다.',
    category: 'B',
  },
  {
    id: 8,
    text: '음악을 들으면 깊이 감동받는 편이다.',
    category: 'B',
  },
  {
    id: 9,
    text: '아름다운 자연이나 예술 작품에서 강한 감동을 느낀다.',
    category: 'B',
  },
  {
    id: 10,
    text: '다른 사람이 불공정한 대우를 받으면 내 일처럼 화가 난다.',
    category: 'B',
  },
  {
    id: 11,
    text: '어릴 때 기억이 유독 생생하게 남아있다.',
    category: 'B',
  },
  {
    id: 12,
    text: '공포 영화나 폭력적인 콘텐츠를 잘 못 본다.',
    category: 'B',
  },

  // ─── 카테고리 C: 타인 감정 흡수 (5문항) ────────────────────────────
  {
    id: 13,
    text: '옆 사람이 기분 나쁘면 내 기분도 영향받는다.',
    category: 'C',
  },
  {
    id: 14,
    text: '여러 사람이 나를 동시에 관찰하면 긴장된다.',
    category: 'C',
  },
  {
    id: 15,
    text: '갈등 상황을 매우 불편하게 느낀다.',
    category: 'C',
  },
  {
    id: 16,
    text: '누군가의 기대를 저버리는 것이 매우 힘들다.',
    category: 'C',
  },
  {
    id: 17,
    text: '타인의 감정 변화를 금방 알아챈다.',
    category: 'C',
  },

  // ─── 카테고리 D: 과부하 민감도 (5문항) ─────────────────────────────
  {
    id: 18,
    text: '할 일이 한꺼번에 많으면 어디서 시작해야 할지 멍해진다.',
    category: 'D',
  },
  {
    id: 19,
    text: '짧은 시간에 많은 것을 처리해야 하면 쉽게 지친다.',
    category: 'D',
  },
  {
    id: 20,
    text: '혼잡한 환경에서 오래 있으면 집에서 혼자 쉬고 싶어진다.',
    category: 'D',
  },
  {
    id: 21,
    text: '계획이 갑자기 바뀌면 스트레스를 받는다.',
    category: 'D',
  },
  {
    id: 22,
    text: '멀티태스킹이 유독 힘들게 느껴진다.',
    category: 'D',
  },

  // ─── 카테고리 E: 자극 처리 깊이 (5문항) ────────────────────────────
  {
    id: 23,
    text: '결정하기 전에 경우의 수를 너무 많이 따진다.',
    category: 'E',
  },
  {
    id: 24,
    text: '어떤 일이든 깊이 생각하는 편이다.',
    category: 'E',
  },
  {
    id: 25,
    text: '말하기 전에 여러 번 고려하는 편이다.',
    category: 'E',
  },
  {
    id: 26,
    text: '작은 실수도 오래 떠올리며 자책한다.',
    category: 'E',
  },
  {
    id: 27,
    text: '사람이나 상황을 볼 때 남들이 못 보는 디테일을 잘 포착한다.',
    category: 'E',
  },
]

export const TOTAL_QUESTIONS = questions.length // 27
