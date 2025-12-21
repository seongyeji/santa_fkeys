<template>
  <div class="container mx-auto px-4 py-8">
    <div ref="resultCardRef" class="animate-on-scroll" :class="{ 'is-visible': isCardVisible }">
      <ResultCard
        v-if="displayResult"
        :result="displayResult"
        :user-name="displayUserName"
        class="mb-8"
      />
    </div>

    <div ref="chartRef" class="animate-on-scroll" :class="{ 'is-visible': isChartVisible }">
      <ResultPercentageChart
        v-if="displayResult"
        :percentages="displayResult.percentages"
        class="mb-8"
      />
    </div>

    <div ref="buttonsRef" class="animate-on-scroll" :class="{ 'is-visible': isButtonsVisible }">
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <UButton
          variant="solid"
          size="xl"
          color="primary"
          icon="solar:repeat-line-duotone"
          class="text-lg font-bold px-8 py-4 min-w-40 shadow-lg hover:scale-105 transition-transform"
          @click="handleRestart"
        >
          다시하기
        </UButton>

        <UButton
          v-if="!isSharedResult"
          variant="soft"
          size="xl"
          color="success"
          icon="solar:square-share-line-line-duotone"
          class="text-lg font-bold px-8 py-4 min-w-40 shadow-lg hover:scale-105 transition-transform"
          @click="handleShare"
        >
          공유하기
        </UButton>

        <UButton
          v-if="!isSharedResult"
          variant="soft"
          size="xl"
          icon="solar:download-line-duotone"
          class="text-lg font-bold px-8 py-4 min-w-40 shadow-lg hover:scale-105 transition-transform"
          @click="handleDownloadImage"
        >
          이미지 저장
        </UButton>
      </div>
    </div>

    <!-- 공연 홍보 카드 -->
    <div ref="promoRef" class="animate-on-scroll mt-16" :class="{ 'is-visible': isPromoVisible }">
      <ResultPromoCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toPng } from 'html-to-image'
import { useQuizStore } from '~/stores/quiz'
import { useUserStore } from '~/stores/user'
import type { QuizResult } from '~/types/quiz'

const quizStore = useQuizStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const resultCardRef = ref<HTMLElement | null>(null)
const chartRef = ref<HTMLElement | null>(null)
const buttonsRef = ref<HTMLElement | null>(null)
const promoRef = ref<HTMLElement | null>(null)
const isSharedResult = ref(false)

// 스크롤 애니메이션 상태
const isCardVisible = ref(false)
const isChartVisible = ref(false)
const isButtonsVisible = ref(false)
const isPromoVisible = ref(false)

const displayUserName = computed(() => userStore.name || quizStore.savedUserName)
const displayResult = computed<QuizResult | null>(() => quizStore.savedResult || quizStore.result)

// Intersection Observer 설정
let observer: IntersectionObserver | null = null

const setupScrollAnimation = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === resultCardRef.value) {
          isCardVisible.value = true
        } else if (entry.target === chartRef.value) {
          isChartVisible.value = true
        } else if (entry.target === buttonsRef.value) {
          isButtonsVisible.value = true
        } else if (entry.target === promoRef.value) {
          isPromoVisible.value = true
        }
      }
    })
  }, options)

  if (resultCardRef.value) observer.observe(resultCardRef.value)
  if (chartRef.value) observer.observe(chartRef.value)
  if (buttonsRef.value) observer.observe(buttonsRef.value)
  if (promoRef.value) observer.observe(promoRef.value)
}

onMounted(async () => {
  const token = route.query.token as string | undefined
  if (token) {
    try {
      const tokenData = await $fetch<{ result: QuizResult; userName: string; answers: string[] }>(
        `/api/result?id=${token}`
      )
      if (tokenData) {
        quizStore.savedResult = tokenData.result
        quizStore.savedUserName = tokenData.userName
        quizStore.answers = tokenData.answers as any
        quizStore.isCompleted = true
        isSharedResult.value = true
      }
    } catch (error) {
      console.error('공유 결과 불러오기 실패:', error)
    }
  }

  await nextTick()
  if (!displayResult.value) {
    router.push('/')
  } else {
    // 스크롤 애니메이션 설정
    setupScrollAnimation()
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

const handleRestart = () => {
  quizStore.resetQuiz()
  router.push('/')
}

const handleShare = async () => {
  if (!displayResult.value) return
  try {
    const response = await $fetch<{ id: string }>('/api/result', {
      method: 'POST',
      body: {
        userName: displayUserName.value,
        result: displayResult.value,
        answers: quizStore.answers
      }
    })
    await navigator.clipboard.writeText(`${window.location.origin}/result?token=${response.id}`)
    alert('결과 링크가 클립보드에 복사되었습니다!')
  } catch (error) {
    console.error(error)
    alert('공유 실패')
  }
}

const handleDownloadImage = async () => {
  if (!resultCardRef.value || !displayResult.value) return
  const dataUrl = await toPng(resultCardRef.value, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#fff'
  })
  const link = document.createElement('a')
  link.download = `산타_대타_임무_${displayUserName.value}_결과.png`
  link.href = dataUrl
  link.click()
}
</script>

<style scoped>
/* 스크롤 애니메이션 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 각 요소별 지연 시간 */
.animate-on-scroll:nth-child(1) {
  transition-delay: 0s;
}

.animate-on-scroll:nth-child(2) {
  transition-delay: 0.15s;
}

.animate-on-scroll:nth-child(3) {
  transition-delay: 0.3s;
}

.animate-on-scroll:nth-child(4) {
  transition-delay: 0.45s;
}
</style>
