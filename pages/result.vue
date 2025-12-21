<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 이미지 생성용 숨겨진 ResultCard -->
    <div
      v-if="displayResult && !generatedImageUrl"
      ref="resultCardRef"
      class="fixed top-0 left-0 opacity-0 pointer-events-none"
      style="width: 500px; height: 600px; z-index: -1"
    >
      <ResultCard :result="displayResult" :user-name="displayUserName" />
    </div>

    <!-- 실제 화면에 표시될 이미지 -->
    <div class="animate-on-scroll" :class="{ 'is-visible': isCardVisible }">
      <img
        v-if="generatedImageUrl"
        :src="generatedImageUrl"
        alt="결과 카드"
        class="mb-8 mx-auto w-full"
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

    <!-- 로딩 오버레이 -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="flex flex-col items-center gap-4">
        <div
          class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="text-white text-lg font-medium">{{ loadingMessage }}</p>
      </div>
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

// 로딩 상태
const isLoading = ref(false)
const loadingMessage = ref('')

// 생성된 이미지 상태
const generatedImageUrl = ref<string | null>(null)

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

const generateCardImage = async () => {
  if (!resultCardRef.value) return

  try {
    // DOM이 완전히 렌더링될 때까지 대기
    await new Promise((resolve) => setTimeout(resolve, 500))

    const element = resultCardRef.value.querySelector('.result-card-inner')
    if (!element) {
      console.error('ResultCard 요소를 찾을 수 없습니다')
      return
    }

    const targetWidth = 500
    const targetHeight = 600

    // 이미지 생성 (base64 data URL)
    const dataUrl = await toPng(element as HTMLElement, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#000000',
      cacheBust: true,
      width: targetWidth,
      height: targetHeight
    })

    generatedImageUrl.value = dataUrl
  } catch (error) {
    console.error('이미지 생성 실패:', error)
  }
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
    // 이미지 생성 시작
    isLoading.value = true
    loadingMessage.value = '결과 이미지 생성 중...'

    // 스크롤 애니메이션 설정
    setupScrollAnimation()

    // ResultCard 이미지 생성
    await generateCardImage()

    isLoading.value = false
    loadingMessage.value = ''
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

  isLoading.value = true
  loadingMessage.value = '공유 링크 생성 중...'

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
  } finally {
    isLoading.value = false
    loadingMessage.value = ''
  }
}

const handleDownloadImage = async () => {
  if (!displayResult.value) return

  isLoading.value = true
  loadingMessage.value = '이미지 다운로드 중...'

  try {
    // 이미 생성된 이미지가 없으면 생성
    if (!generatedImageUrl.value) {
      loadingMessage.value = '이미지 생성 중...'
      await generateCardImage()
    }

    if (generatedImageUrl.value) {
      const link = document.createElement('a')
      link.download = `산타_대타_임무_${displayUserName.value}_결과.png`
      link.href = generatedImageUrl.value
      link.click()
    }
  } catch (error) {
    console.error('이미지 저장 실패:', error)
    alert('이미지 저장에 실패했습니다. 다시 시도해주세요.')
  } finally {
    isLoading.value = false
    loadingMessage.value = ''
  }
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
