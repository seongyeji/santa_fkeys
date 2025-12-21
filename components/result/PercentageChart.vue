<template>
  <div
    class="relative rounded-xl p-6 md:p-8 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700/60 shadow-[0_0_40px_rgba(56,189,248,0.08)]"
  >
    <!-- 헤더 -->
    <h3
      class="text-lg md:text-xl font-semibold tracking-widest text-slate-100 mb-8 flex items-center gap-2"
    >
      <span class="text-primary-400">ANALYSIS</span>
      <span class="text-slate-400 text-sm">RESULT</span>
    </h3>

    <!-- 차트 -->
    <div class="space-y-5">
      <div v-for="item in chartData" :key="item.key" class="space-y-2">
        <!-- 라벨 -->
        <div class="flex justify-between items-center">
          <span
            class="text-sm font-medium tracking-wide"
            :class="item.isHighest ? 'text-primary-300' : 'text-slate-400'"
          >
            {{ item.name }}
          </span>

          <span
            class="text-sm font-mono"
            :class="
              item.isHighest
                ? 'text-primary-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]'
                : 'text-slate-500'
            "
          >
            {{ item.percentage || 0 }}%
          </span>
        </div>

        <!-- 바 -->
        <div
          class="relative w-full h-3 rounded-full overflow-hidden bg-slate-800 border border-slate-700/50"
        >
          <div v-if="item.isHighest" class="absolute inset-0 blur-md bg-primary-500/30" />
          <div
            class="relative h-full transition-all duration-700 ease-out"
            :class="
              item.isHighest
                ? 'bg-gradient-to-r from-primary-400 to-primary-600'
                : 'bg-gradient-to-r from-slate-500 to-slate-400'
            "
            :style="{ width: `${item.percentage || 0}%` }"
          />
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CHARACTER_PROFILES } from '~/data/questions'

type CharacterKey = 'lena' | 'rahel' | 'dowon' | 'runa'

const props = defineProps<{
  percentages: Partial<Record<CharacterKey, number>> | null
}>()

// 애니메이션용 현재 퍼센테이지 상태
const animatedPercentages = ref<Record<CharacterKey, number>>({
  lena: 0,
  rahel: 0,
  dowon: 0,
  runa: 0
})

// 애니메이션 함수
const animatePercentage = (key: CharacterKey, target: number) => {
  const duration = 1500 // 1.5초
  const steps = 60
  const increment = target / steps
  let current = 0
  let step = 0

  const timer = setInterval(() => {
    step++
    current += increment

    if (step >= steps) {
      animatedPercentages.value[key] = target
      clearInterval(timer)
    } else {
      animatedPercentages.value[key] = Math.round(current)
    }
  }, duration / steps)
}

// props.percentages 변경 감지 및 애니메이션 실행
watch(
  () => props.percentages,
  (newPercentages) => {
    if (newPercentages) {
      const characterKeys: CharacterKey[] = ['lena', 'rahel', 'dowon', 'runa']
      characterKeys.forEach((key) => {
        const target = newPercentages[key] || 0
        animatePercentage(key, target)
      })
    }
  },
  { immediate: true }
)

const chartData = computed(() => {
  const characterKeys: CharacterKey[] = ['lena', 'rahel', 'dowon', 'runa']
  if (!props.percentages)
    return characterKeys.map((key) => ({
      key,
      name: CHARACTER_PROFILES[key].name,
      percentage: 0,
      isHighest: false
    }))

  const highest = Math.max(...characterKeys.map((key) => props.percentages?.[key] || 0))

  return characterKeys.map((key) => ({
    key,
    name: CHARACTER_PROFILES[key].name,
    percentage: animatedPercentages.value[key],
    isHighest: (props.percentages?.[key] || 0) === highest
  }))
})
</script>
