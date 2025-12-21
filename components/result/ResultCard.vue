<template>
  <div v-if="result" :class="['rounded-2xl shadow-2xl p-8 md:p-12', cardColorClass]">
    <div class="text-center mb-8">
      <div
        :class="[
          'inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full text-white text-5xl md:text-6xl mb-6 shadow-lg',
          iconColorClass
        ]"
      >
        🎅
      </div>

      <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ userName }}님은</h2>

      <h3 :class="['text-5xl md:text-7xl font-black mb-6 leading-tight', textColorClass]">
        {{ result.characterName }}
      </h3>

      <p class="text-xl md:text-2xl leading-relaxed whitespace-pre-line">
        {{ result.description }}
      </p>
    </div>

    <div v-if="characterTraits.length" class="mt-10">
      <h4 class="text-base md:text-lg font-semibold mb-4 text-center">주요 특징</h4>
      <div class="flex flex-wrap justify-center gap-3">
        <span
          v-for="trait in characterTraits"
          :key="trait"
          class="px-5 py-3 rounded-full text-base md:text-lg font-medium shadow-md"
        >
          {{ trait }}
        </span>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-10">결과를 불러오는 중...</div>
</template>

<script setup lang="ts">
import type { QuizResult } from '~/types/quiz'
import { CHARACTER_PROFILES } from '~/data/questions'
import { computed } from 'vue'

const props = defineProps<{
  result: QuizResult | null
  userName: string
}>()

const typeMapping = { A: 'lena', B: 'rahel', C: 'dowon', D: 'runa' } as const

const characterKey = computed(() => typeMapping[props.result?.dominantType ?? 'A']) // 기본값 A

const characterTraits = computed(() => {
  const key = characterKey.value
  return CHARACTER_PROFILES[key]?.traits ?? []
})

const cardColorClass = computed(() => {
  const colors = {
    lena: 'bg-gradient-to-br from-transparent to-orange-800/20',
    rahel: 'bg-gradient-to-br from-transparent to-purple-800/20',
    dowon: 'bg-gradient-to-br from-transparent to-green-800/20',
    runa: 'bg-gradient-to-br from-transparent to-slate-800/20'
  }
  return colors[characterKey.value] ?? ''
})

const iconColorClass = computed(() => {
  const colors = {
    lena: 'bg-orange-500',
    rahel: 'bg-purple-500',
    dowon: 'bg-green-500',
    runa: 'bg-slate-500'
  }
  return colors[characterKey.value] ?? ''
})

const textColorClass = computed(() => {
  const colors = {
    lena: 'text-orange-400',
    rahel: 'text-purple-400',
    dowon: 'text-green-400',
    runa: 'text-slate-400'
  }
  return colors[characterKey.value] ?? ''
})
</script>
