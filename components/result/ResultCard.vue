<template>
  <div v-if="result" :class="['rounded-2xl border relative aspect-5/6', borderColorClass]" class="result-card-inner">
    <div class="absolute inset-0 overflow-hidden rounded-2xl">
      <img :src="characterImage" class="w-full h-full object-cover" :alt="result.characterName" />
    </div>

    <div
      :class="[
        'inline-flex items-center justify-center gap-1 rounded-tr-2xl rounded-bl-2xl absolute right-0 top-0 py-2 px-3 z-10 whitespace-nowrap',
        badgeColorClass
      ]"
    >
      <span>🎅</span>
      <span>{{ userName }}</span>
    </div>

    <div v-if="characterTraits.length" class="absolute w-full bottom-[5%] z-10">
      <div class="flex flex-wrap justify-end gap-3 w-[90%] mx-auto">
        <span
          v-for="trait in characterTraits"
          :key="trait"
          :class="[
            'px-3 py-1 rounded-full text-base font-medium shadow-md border bg-black/50',
            traitColorClass
          ]"
        >
          #
          {{ trait }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizResult } from '~/types/quiz'
import { CHARACTER_PROFILES } from '~/data/questions'
import { computed } from 'vue'
import lenaImg from '@/assets/imgs/result/lena.png'
import rahelImg from '@/assets/imgs/result/rahel.png'
import dowonImg from '@/assets/imgs/result/dowon.png'
import runaImg from '@/assets/imgs/result/runa.png'

const props = defineProps<{
  result: QuizResult | null
  userName: string
}>()

const typeMapping = { A: 'lena', B: 'rahel', C: 'dowon', D: 'runa' } as const

const characterKey = computed(() => typeMapping[props.result?.dominantType ?? 'A']) // 기본값 A

const characterTraits = computed(() => {
  // 개인화된 특성이 있으면 우선 사용, 없으면 기본 특성 사용
  if (props.result?.personalizedTraits && props.result.personalizedTraits.length > 0) {
    return props.result.personalizedTraits
  }

  const key = characterKey.value
  return CHARACTER_PROFILES[key]?.traits ?? []
})

// 캐릭터별 이미지 경로
const characterImage = computed(() => {
  const images = {
    lena: lenaImg,
    rahel: rahelImg,
    dowon: dowonImg,
    runa: runaImg
  }
  return images[characterKey.value] ?? images.rahel
})

// 테두리 그라데이션
const borderColorClass = computed(() => {
  const colors = {
    lena: 'border-2 border-transparent bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-border',
    rahel:
      'border-2 border-transparent bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 bg-clip-border',
    dowon:
      'border-2 border-transparent bg-gradient-to-br from-green-400 via-green-500 to-green-600 bg-clip-border',
    runa: 'border-2 border-transparent bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 bg-clip-border'
  }
  return colors[characterKey.value] ?? colors.rahel
})

// 배지 배경 색상
const badgeColorClass = computed(() => {
  const colors = {
    lena: 'bg-orange-500',
    rahel: 'bg-purple-500',
    dowon: 'bg-green-500',
    runa: 'bg-slate-300 text-slate-900'
  }
  return colors[characterKey.value] ?? 'bg-purple-500'
})

// 특성 태그 색상
const traitColorClass = computed(() => {
  const colors = {
    lena: 'border-orange-500 text-orange-500',
    rahel: 'border-purple-500 text-purple-500',
    dowon: 'border-green-500 text-green-500',
    runa: 'border-slate-300 text-slate-300'
  }
  return colors[characterKey.value] ?? 'border-purple-500 text-purple-500'
})
</script>
