<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center">
      <span class="text-sm font-mono text-blue-400"> QUEST {{ current }}/{{ total }} </span>
      <span class="text-sm font-mono text-purple-400"> {{ percentage }}% </span>
    </div>
    <div
      class="w-full h-3 bg-slate-800/80 rounded-sm overflow-hidden relative border border-slate-600/50"
    >
      <!-- 배경 그리드 -->
      <div
        class="absolute inset-0 opacity-10"
        style="
          background-image: linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px);
          background-size: 10px 100%;
        "
      />

      <!-- 진행 바 -->
      <div
        v-if="percentage > 0"
        class="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 transition-all duration-500 relative overflow-hidden ease-out"
        :style="{ width: `${percentage}%` }"
      >
        <!-- 스캔 라인 애니메이션 -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan"
        />

        <!-- 펄스 효과 -->
        <div class="absolute inset-0 bg-blue-400/20 animate-pulse" />
      </div>

      <!-- 우측 끝 발광 -->
      <div
        v-if="percentage > 0 && percentage < 100"
        class="absolute top-0 bottom-0 w-1 bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out"
        :style="{ left: `calc(${percentage}% - 1px)` }"
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

<style scoped>
@keyframes scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-scan {
  animation: scan 2s linear infinite;
}
</style>
