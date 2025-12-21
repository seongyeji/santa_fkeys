// Character type definition
export type CharacterType = 'A' | 'B' | 'C' | 'D'

// Score mapping for each choice
export interface ChoiceScores {
  lena: number
  rahel: number
  dowon: number
  runa: number
}

// Single question structure
export interface Question {
  id: number
  title: string // Korean scenario description
  desc: string // Korean scenario description
  choices: {
    A: string
    B: string
    C: string
    D: string
  }
  scores: {
    A: ChoiceScores // Scores for choosing option A
    B: ChoiceScores // Scores for choosing option B
    C: ChoiceScores // Scores for choosing option C
    D: ChoiceScores // Scores for choosing option D
  }
}

// Quiz result
export interface QuizResult {
  dominantType: CharacterType
  characterName: string
  description: string
  percentages: {
    lena: number
    rahel: number
    dowon: number
    runa: number
  }
  personalizedTraits?: string[]
}

// Character profile
export interface CharacterProfile {
  type: CharacterType
  name: string
  description: string
  traits: string[]
}
