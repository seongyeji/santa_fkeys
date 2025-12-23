<template>
  <div id="home" class="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
    <!-- 그리드 패턴 -->
    <div
      class="absolute inset-0 opacity-10 -z-1"
      style="
        background-image:
          linear-gradient(blue 1px, transparent 1px),
          linear-gradient(90deg, blue 1px, transparent 1px);
        background-size: 30px 30px;
      "
    />
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 z-0"
    />

    <!-- <div class="text-center flex flex-col items-center py-10">
      <div class="w-full flex justify-center">
        <img src="@/assets/imgs/logo_w.png" class="w-[40%] opacity-10" alt="fkeys" />
      </div>
      <div class="flex flex-col gap-3 items-center -mt-[5%]">
        <img src="@/assets/imgs/mission.png" alt="mission" class="w-[80%]" />
        <span>* ~ 𝒇 𝙆𝙀𝙔𝙎 𝙛𝙖𝙣 𝙜𝙖𝙢𝙚 ~ *</span>
      </div>
    </div> -->
    <div class="relative">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center space-y-4">
          <div class="font-founder text-3xl text-blue-50 tracking-wide mb-4">
            <div
              class="font-mono text-sm text-blue-300 tracking-widest animate-pulse"
              style="animation-duration: 2s"
            >
              * ~ 𝒇 𝙆𝙀𝙔𝙎 𝙛𝙖𝙣 𝙜𝙖𝙢𝙚 ~ *
            </div>
            크리스마스 선물 배달
          </div>

          <div class="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          <p class="text-slate-200 leading-relaxed break-keep">
            임무를 끝까지 진행하면,<br />
            가장 닮은 <span class="text-blue-300 font-semibold">fkeys 요원</span>이 안내됩니다.
          </p>

          <div class="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          <div class="flex mt-10">
            <NuxtLink
              class="w-full py-4 px-3 text-center rounded-lg transition-all duration-300 relative overflow-hidden group border-2 border-blue-400 bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              to="quiz"
            >
              <!-- 배경 그로우 효과 -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"
              />

              <!-- 호버 스캔라인 효과 -->
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <!-- 좌측 테크 라인 -->
              <div
                :class="[
                  'absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300',
                  'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                ]"
              />

              <!-- 우측 테크 라인 -->
              <div
                :class="[
                  'absolute right-0 top-0 bottom-0 w-1.5 transition-all duration-300',
                  'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                ]"
              />

              <!-- 텍스트 -->
              <p
                class="text-lg font-normal transition-all duration-300 relative z-10 text-white font-bold"
              >
                - 임무 시작 -
              </p>

              <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-300" />
              <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-300" />
              <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-300" />
              <div
                class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-300"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
