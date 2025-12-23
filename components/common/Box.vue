<template>
  <div class="flex flex-col relative overflow-hidden">
    <!-- 네온 그로우 효과 -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none z-0"
    />

    <!-- 그리드 패턴 -->
    <div
      class="absolute inset-0 opacity-5 z-0"
      style="
        background-image:
          linear-gradient(blue 1px, transparent 1px),
          linear-gradient(90deg, blue 1px, transparent 1px);
        background-size: 20px 20px;
      "
    />

    <!-- 코너 장식 -->

    <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/20 z-30" />
    <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400/20 z-30" />
    <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/20 z-30" />
    <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400/20 z-30" />

    <div
      ref="scrollContainer"
      class="relative z-10 overflow-y-auto px-6 py-12 pt-10"
      @scroll="handleScroll"
    >
      <slot />
    </div>

    <!-- 스크롤 힌트 - 상단 -->
    <div
      v-if="showTopGradient"
      class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-800/95 via-slate-800/60 to-transparent pointer-events-none z-20 transition-opacity duration-300"
    />

    <!-- 스크롤 힌트 - 하단 -->
    <div
      v-if="showBottomGradient"
      class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-800/95 via-slate-800/60 to-transparent pointer-events-none z-20 transition-opacity duration-300"
    />
  </div>
</template>

<script setup lang="ts">
const scrollContainer = ref<HTMLElement | null>(null)
const showTopGradient = ref(false)
const showBottomGradient = ref(false)

const handleScroll = () => {
  if (!scrollContainer.value) return

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value

  // 상단 그라데이션: 스크롤이 조금이라도 내려갔으면 표시
  showTopGradient.value = scrollTop > 10

  // 하단 그라데이션: 스크롤이 끝까지 내려가지 않았으면 표시
  showBottomGradient.value = scrollTop + clientHeight < scrollHeight - 10
}

onMounted(() => {
  // 초기 상태 확인
  handleScroll()
})
</script>
