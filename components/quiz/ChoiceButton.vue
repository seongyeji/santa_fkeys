<template>
  <button
    :class="[
      'w-full py-4 px-3 text-center rounded-lg transition-all duration-300 relative overflow-hidden group',
      'active:scale-[0.98]',
      isSelected
        ? 'border-2 border-blue-400 bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.5)]'
        : 'border-2 border-slate-500/70 hover:border-blue-400/70 bg-slate-700/30 hover:bg-slate-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
    ]"
    @click="$emit('click')"
  >
    <!-- 배경 그로우 효과 -->
    <div
      v-if="isSelected"
      class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"
    />

    <!-- 호버 스캔라인 효과 -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />

    <!-- 좌측 테크 라인 -->
    <div
      :class="[
        'absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300',
        isSelected
          ? 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
          : 'bg-slate-500/50 group-hover:bg-blue-400/70'
      ]"
    />

    <!-- 우측 테크 라인 -->
    <div
      :class="[
        'absolute right-0 top-0 bottom-0 w-1.5 transition-all duration-300',
        isSelected
          ? 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
          : 'bg-slate-500/50 group-hover:bg-blue-400/70'
      ]"
    />

    <!-- 텍스트 -->
    <p
      :class="[
        'text-lg font-medium transition-all duration-300 relative z-10',
        isSelected ? 'text-white font-bold' : 'text-slate-200 group-hover:text-white'
      ]"
    >
      {{ text }}
    </p>

    <!-- 선택된 상태 코너 표시 -->
    <div
      v-if="isSelected"
      class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-300"
    />
    <div
      v-if="isSelected"
      class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-300"
    />
    <div
      v-if="isSelected"
      class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-300"
    />
    <div
      v-if="isSelected"
      class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-300"
    />
  </button>
</template>

<script setup lang="ts">
import type { CharacterType } from '~/types/quiz'

defineProps<{
  label: CharacterType
  text: string
  isSelected: boolean
}>()

defineEmits<{
  click: []
}>()
</script>
