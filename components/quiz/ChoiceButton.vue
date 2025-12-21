<template>
  <button
    :class="[
      'w-full p-4 text-left rounded-lg border-2 transition-all duration-200',
      'hover:scale-[1.02] hover:shadow-lg ',
      isSelected
        ? 'border-primary-500 bg-primary-900/20'
        : 'border-slate-700 hover:border-primary-600'
    ]"
    @click="$emit('click')"
  >
    <div class="flex items-center gap-3">
      <div
        :class="[
          'shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
          isSelected ? 'bg-primary-500 text-white' : 'bg-slate-600 text-slate-400'
        ]"
      >
        {{ label }}
      </div>
      <div class="flex-1 flex items-center">
        <p :class="['text-lg', isSelected ? 'text-slate-100' : 'text-slate-300']">
          {{ text }}
        </p>
      </div>
    </div>
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
