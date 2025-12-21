<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <span class="text-sm font-medium text-slate-400"> 질문 {{ current }}/{{ total }} </span>
      <span class="text-sm font-medium text-primary-400"> {{ percentage }}% </span>
    </div>
    <div class="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        class="h-full bg-primary-500 transition-all duration-300 ease-out"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  current: number
  total: number
}>()

const percentage = computed(() => {
  return Math.round((props.current / props.total) * 100)
})
</script>
