import { defineStore } from 'pinia'
import type { CharacterType } from '~/types/quiz'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    lastResult: null as CharacterType | null
  }),

  actions: {
    set(newName: string) {
      this.name = newName
    },

    saveResult(characterType: CharacterType) {
      this.lastResult = characterType
    }
  }
})
