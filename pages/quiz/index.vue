<template>
  <div class="min-h-screen flex py-10 px-4">
    <div class="w-full space-y-6">
      <!-- 진행 바 -->
      <QuizProgressBar
        :current="quizStore.currentQuestionIndex + 1"
        :total="QUIZ_QUESTIONS.length"
      />

      <!-- 이름 입력 -->
      <transition name="question-fade-slide" mode="out-in">
        <div
          v-if="quizStore.currentQuestionIndex === -1"
          key="name-input"
          class="bg-slate-800 rounded-xl shadow-lg p-6 md:p-8"
        >
          <div class="mb-8">
            <h6 class="text-[1.75rem] font-founder pb-3">"요원, 이름을 알려주세요"</h6>
            <p class="text-base text-slate-200 leading-relaxed whitespace-pre-line">
              임무 출동을 위해 먼저 당신의 이름이 필요합니다. <br />
              정확히 입력하고 준비를 마쳐주세요.
            </p>
          </div>

          <UInput
            v-model="userName"
            placeholder="닉네임을 입력하세요"
            size="xl"
            variant="none"
            class="w-full rounded-none border-b border-slate-500 focus-within:border-white bg-transparent text-white!"
            :ui="{ base: 'text-white' }"
            @keyup.enter="isValidName && startQuiz()"
            @blur="isValidName && startQuiz()"
          />
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
