<template>
  <div class="h-screen flex py-5 px-4 overflow-hidden">
    <div class="w-full flex flex-col gap-6 grow">
      <!-- 진행 바 -->
      <QuizProgressBar
        :current="quizStore.currentQuestionIndex + 1"
        :total="QUIZ_QUESTIONS.length"
      />

      <!-- 이름 입력 -->
      <transition name="question-fade-slide" mode="out-in">
        <div v-if="quizStore.currentQuestionIndex === -1">
          <CommonBox key="name-input">
            <div class="text-center">
              <h6 class="text-4xl font-founder pb-3 break-keep">요원, 이름을 알려주세요</h6>
              <p class="text-base text-slate-200 leading-relaxed break-keep">
                임무 출동을 위해 먼저 당신의 이름이 필요합니다. <br />
                정확히 입력하고 준비를 마쳐주세요.
              </p>
            </div>
          </CommonBox>
          <div class="relative mt-10">
            <div
              class="w-full border-2 rounded-lg transition-all duration-300 relative overflow-hidden"
              :class="
                userName
                  ? 'border-blue-400 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'border-slate-600 bg-slate-700/30'
              "
            >
              <!-- 배경 그로우 효과 -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse pointer-events-none transition-opacity duration-300"
                :class="userName ? 'opacity-100' : 'opacity-0'"
              />

              <!-- 좌측 테크 라인 -->
              <div
                class="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                :class="userName ? 'bg-blue-400' : 'bg-slate-600/50'"
              />

              <!-- 우측 테크 라인 -->
              <div
                class="absolute right-0 top-0 bottom-0 w-1 transition-all duration-300"
                :class="userName ? 'bg-blue-400' : 'bg-slate-600/50'"
              />

              <!-- Input -->
              <input
                v-model="userName"
                type="text"
                placeholder="[ ENTER YOUR CODENAME ]"
                class="w-full py-4 px-6 bg-transparent text-white text-center font-mono tracking-wider placeholder:text-slate-500 placeholder:font-mono outline-none relative z-10"
                @keyup.enter="isValidName && startQuiz()"
                @blur="isValidName && startQuiz()"
              />

              <!-- 코너 표시 -->
              <div
                class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-300 pointer-events-none transition-opacity duration-300"
                :class="userName ? 'opacity-100' : 'opacity-0'"
              />
              <div
                class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-300 pointer-events-none transition-opacity duration-300"
                :class="userName ? 'opacity-100' : 'opacity-0'"
              />
              <div
                class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-300 pointer-events-none transition-opacity duration-300"
                :class="userName ? 'opacity-100' : 'opacity-0'"
              />
              <div
                class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-300 pointer-events-none transition-opacity duration-300"
                :class="userName ? 'opacity-100' : 'opacity-0'"
              />
            </div>
          </div>
        </div>
        <!-- 퀴즈 진행 -->
        <QuizQuestionCard
          v-else-if="quizStore.currentQuestion"
          :key="quizStore.currentQuestionIndex"
          :question="quizStore.currentQuestion"
          :selected-answer="quizStore.currentAnswer ?? undefined"
          @select="handleSelectAnswer"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterType } from '~/types/quiz'
import { useRouter } from 'vue-router'
import { useQuizStore } from '~/stores/quiz'
import { useUserStore } from '~/stores/user'
import { QUIZ_QUESTIONS } from '~/data/questions'

const router = useRouter()
const quizStore = useQuizStore()
const userStore = useUserStore()

const userName = ref('')
const isValidName = computed(() => userName.value.trim().length > 0)

const startQuiz = () => {
  userStore.set(userName.value.trim())
  quizStore.resetQuiz()
  quizStore.currentQuestionIndex = 0
  quizStore.currentQuestion = QUIZ_QUESTIONS[0] ?? null
}

const handleSelectAnswer = async (answer: CharacterType) => {
  quizStore.selectAnswer(answer)
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (quizStore.isLastQuestion) {
    quizStore.completeQuiz(userStore.name)
    if (quizStore.result) {
      userStore.saveResult(quizStore.result.dominantType)
    }
    await router.push('/result')
  } else {
    quizStore.nextQuestion()
  }
}

onBeforeMount(() => {
  // 퀴즈 시작 시 무조건 이름 입력부터 시작
  quizStore.currentQuestionIndex = -1
  quizStore.currentQuestion = null
})
</script>

<style scoped>
.question-fade-slide-enter-active,
.question-fade-slide-leave-active {
  transition: all 0.4s ease;
}
.question-fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.question-fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.question-fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.question-fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
