export type CharacterType = 'A' | 'B' | 'C' | 'D'

export interface ChoiceScores {
  lena: number
  rahel: number
  dowon: number
  runa: number
}

export interface Question {
  title: string
  desc: string
  choices: {
    A: string
    B: string
    C: string
    D: string
  }
  scores: {
    A: ChoiceScores
    B: ChoiceScores
    C: ChoiceScores
    D: ChoiceScores
  }
}

export interface QuizResult {
  dominantType: CharacterType
  characterName: string
  percentages: {
    lena: number
    rahel: number
    dowon: number
    runa: number
  }
  personalizedTraits?: string[]
}

export interface CharacterProfile {
  type: CharacterType
  name: string
  description: string
  traits: string[]
}
