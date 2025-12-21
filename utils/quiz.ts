// utils/quiz.ts
import type { CharacterType, QuizResult } from '~/types/quiz'
import { QUIZ_QUESTIONS, CHARACTER_PROFILES } from '~/data/questions'

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

  // 총 점수 계산
  const totalScore = scores.lena + scores.rahel + scores.dowon + scores.runa

  // 퍼센테이지 계산
  const percentages = {
    lena: totalScore > 0 ? Math.round((scores.lena / totalScore) * 100) : 0,
    rahel: totalScore > 0 ? Math.round((scores.rahel / totalScore) * 100) : 0,
    dowon: totalScore > 0 ? Math.round((scores.dowon / totalScore) * 100) : 0,
    runa: totalScore > 0 ? Math.round((scores.runa / totalScore) * 100) : 0
  }

  // 가장 높은 점수의 캐릭터 타입 찾기
  const dominantCharacter = Object.entries(scores).reduce((max, [char, score]) =>
    score > max.score ? { char, score } : max
  , { char: 'lena', score: 0 }).char as 'lena' | 'rahel' | 'dowon' | 'runa'

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

  return {
    dominantType,
    characterName: profile.name,
    description: profile.description,
    percentages
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
