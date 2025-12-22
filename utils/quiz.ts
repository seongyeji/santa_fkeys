// utils/quiz.ts
import type { CharacterType, QuizResult } from '~/types/quiz'
import { QUIZ_QUESTIONS, CHARACTER_PROFILES } from '~/data/questions'

/**
 * Generate personalized traits based on answer patterns
 */
export function generatePersonalizedTraits(answers: CharacterType[]): string[] {
  // 각 질문별 선택 분석을 위한 패턴 정의
  const traitPatterns: Record<number, Record<CharacterType, string[]>> = {
    1: {
      // 긴급 상황 대처
      A: ['즉각 행동형', '순발력 있는'],
      B: ['체계적인', '꼼꼼한'],
      C: ['협력적인', '팀워크 중시'],
      D: ['침착한', '신중한']
    },
    2: {
      // 위험 상황 판단
      A: ['도전적인', '용감한'],
      B: ['안전 우선적', '현실적인'],
      C: ['유연한', '적응력 있는'],
      D: ['신중한', '여유로운']
    },
    3: {
      // 조심성
      A: ['효율적인', '빠른 판단'],
      B: ['신중한', '세심한'],
      C: ['타인 배려적', '공감하는'],
      D: ['감수성 있는', '섬세한']
    },
    4: {
      // 의사결정 방식
      A: ['직관적인', '결단력 있는'],
      B: ['분석적인', '논리적인'],
      C: ['소통하는', '협력적인'],
      D: ['신중한', '유연한']
    },
    5: {
      // 문제 해결
      A: ['창의적인', '임기응변'],
      B: ['체계적인', '정확한'],
      C: ['공정한', '균형 잡힌'],
      D: ['성찰적인', '진지한']
    },
    6: {
      // 어려움 대처
      A: ['추진력 있는', '도전적인'],
      B: ['전략적인', '계획적인'],
      C: ['신중한', '사려 깊은'],
      D: ['유연한', '현실적인']
    },
    7: {
      // 체력 관리
      A: ['끈기 있는', '의지가 강한'],
      B: ['계획적인', '페이스 조절'],
      C: ['자기 다독이는', '긍정적인'],
      D: ['자기 이해적', '솔직한']
    },
    8: {
      // 감정 반응
      A: ['열정적인', '적극적인'],
      B: ['현실적인', '이성적인'],
      C: ['따뜻한', '공감하는'],
      D: ['내성적인', '조용한']
    },
    9: {
      // 우선순위 설정
      A: ['목표 지향적', '중요도 파악'],
      B: ['체계적인', '계획적인'],
      C: ['공평한', '배려하는'],
      D: ['현실적인', '자기 인식']
    },
    10: {
      // 성취 후 감정
      A: ['성취감 중시', '목표 달성형'],
      B: ['완벽주의적', '안정 추구'],
      C: ['타인 중심적', '이타적인'],
      D: ['자기 성찰적', '내면 중시']
    }
  }

  const traitCounts = new Map<string, number>()

  // 각 답변에서 특성 추출
  answers.forEach((answer, index) => {
    const questionId = index + 1
    const traits = traitPatterns[questionId]?.[answer]

    if (traits) {
      traits.forEach((trait) => {
        traitCounts.set(trait, (traitCounts.get(trait) || 0) + 1)
      })
    }
  })

  // 빈도수로 정렬하여 상위 4-5개 특성 선택
  const sortedTraits = Array.from(traitCounts.entries())
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([trait]) => trait)

  return sortedTraits.length > 0 ? sortedTraits : [...CHARACTER_PROFILES.lena.traits]
}

/**
 * Generate full QuizResult from answers
 */
export function calculateResult(answers: CharacterType[]): QuizResult {
  // 각 캐릭터별 점수 합산
  const scores = {
    lena: 0,
    rahel: 0,
    dowon: 0,
    runa: 0
  }

  answers.forEach((answer, index) => {
    const question = QUIZ_QUESTIONS[index]
    if (question && answer) {
      const choiceScores = question.scores[answer]
      scores.lena += choiceScores.lena
      scores.rahel += choiceScores.rahel
      scores.dowon += choiceScores.dowon
      scores.runa += choiceScores.runa
    }
  })

  // 최대 점수 계산 (각 문항당 5점 만점 × 문항 수)
  const maxScore = QUIZ_QUESTIONS.length * 5

  // 퍼센테이지 계산 (각 캐릭터별 점수 / 최대 점수 × 100)
  const percentages = {
    lena: maxScore > 0 ? Math.round((scores.lena / maxScore) * 100) : 0,
    rahel: maxScore > 0 ? Math.round((scores.rahel / maxScore) * 100) : 0,
    dowon: maxScore > 0 ? Math.round((scores.dowon / maxScore) * 100) : 0,
    runa: maxScore > 0 ? Math.round((scores.runa / maxScore) * 100) : 0
  }

  // 가장 높은 점수의 캐릭터 타입 찾기
  const dominantCharacter = Object.entries(scores).reduce(
    (max, [char, score]) => (score > max.score ? { char, score } : max),
    { char: 'lena', score: 0 }
  ).char as 'lena' | 'rahel' | 'dowon' | 'runa'

  // 타입 매핑
  const typeMapping: Record<'lena' | 'rahel' | 'dowon' | 'runa', CharacterType> = {
    lena: 'A',
    rahel: 'B',
    dowon: 'C',
    runa: 'D'
  }
  const dominantType = typeMapping[dominantCharacter]

  // CHARACTER_PROFILES에서 캐릭터 정보 가져오기
  const profile = CHARACTER_PROFILES[dominantCharacter]

  // 개인화된 특성 생성
  const personalizedTraits = generatePersonalizedTraits(answers)

  return {
    dominantType,
    characterName: profile.name,
    percentages,
    personalizedTraits
  }
}

/**
 * Validate that all quiz questions have been answered
 */
export function validateQuizComplete(answers: CharacterType[]): boolean {
  return (
    answers.length === QUIZ_QUESTIONS.length &&
    answers.every((a) => ['A', 'B', 'C', 'D'].includes(a))
  )
}

/**
 * Format result text for sharing
 */
export function formatShareText(
  userName: string,
  characterName: string,
  description: string
): string {
  return `${userName}님은 ${characterName}입니다!\n\n${description}`
}

export function calculateDominantType(answers: CharacterType[]): CharacterType {
  const counts = { A: 0, B: 0, C: 0, D: 0 }
  answers.forEach((answer) => {
    if (answer) counts[answer]++
  })
  const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a)
  return (sorted[0]?.[0] || 'A') as CharacterType
}
