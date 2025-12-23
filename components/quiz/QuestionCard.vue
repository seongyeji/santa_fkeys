<template>
  <div class="flex flex-col gap-10 grow overflow-hidden">
    <CommonBox>
      <div class="text-center flex gap-10 flex-col">
        <h6 class="text-4xl font-founder break-keep">{{ question.title }}</h6>
        <p class="text-base text-slate-200 leading-relaxed whitespace-pre-line">
          {{ question.desc }}
        </p>
      </div>
    </CommonBox>
    <div class="flex flex-col gap-3 shrink">
      <QuizChoiceButton
        v-for="choice in choices"
        :key="choice.label"
        :label="choice.label"
        :text="choice.text"
        :is-selected="selectedAnswer === choice.label"
        @click="$emit('select', choice.label)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question, CharacterType } from '~/types/quiz'

const props = defineProps<{
  question: Question
  selectedAnswer: CharacterType | undefined
}>()

defineEmits<{
  select: [answer: CharacterType]
}>()

const choices = computed(() => [
  { label: 'A' as CharacterType, text: props.question.choices.A },
  { label: 'B' as CharacterType, text: props.question.choices.B },
  { label: 'C' as CharacterType, text: props.question.choices.C },
  { label: 'D' as CharacterType, text: props.question.choices.D }
])
</script>
