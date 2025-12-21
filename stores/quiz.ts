import { defineStore } from 'pinia'
import type { CharacterType, QuizResult, Question } from '~/types/quiz'
import { QUIZ_QUESTIONS } from '~/data/questions'
import { calculateResult } from '~/utils/quiz'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    result: null as QuizResult | null,
    savedResult: null as QuizResult | null,
    savedUserName: '',
    answers: [] as CharacterType[],
    isCompleted: false,
    currentQuestionIndex: 0,
    currentQuestion: null as Question | null,
    currentAnswer: null as CharacterType | null
  }),
  getters: {
    isLastQuestion: (state) => state.currentQuestionIndex === QUIZ_QUESTIONS.length - 1
  },
  actions: {
    resetQuiz() {
      this.result = null
      this.savedResult = null
      this.savedUserName = ''
      this.answers = []
      this.isCompleted = false
      this.currentQuestionIndex = 0
      this.currentQuestion = QUIZ_QUESTIONS[0] ?? null
      this.currentAnswer = null
    },
    selectAnswer(answer: CharacterType) {
      this.currentAnswer = answer
      this.answers[this.currentQuestionIndex] = answer
    },
    nextQuestion() {
      if (this.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        this.currentQuestionIndex++
        this.currentQuestion = QUIZ_QUESTIONS[this.currentQuestionIndex] ?? null
        this.currentAnswer = this.answers[this.currentQuestionIndex] ?? null
      }
    },
    completeQuiz(userName: string) {
      this.result = calculateResult(this.answers)
      this.savedUserName = userName
      this.savedResult = this.result
      this.isCompleted = true
    }
  }
})
