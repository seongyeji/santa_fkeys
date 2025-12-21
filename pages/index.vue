<template>
  <div id="home" class="container mx-auto px-4 py-8">
    <div class="text-center flex flex-col items-center py-10">
      <div class="w-full flex justify-center">
        <img src="@/assets/imgs/logo_w.png" class="w-[40%] opacity-10" alt="fkeys" />
      </div>
      <div class="flex flex-col gap-3 items-center -mt-[5%]">
        <img src="@/assets/imgs/mission.png" alt="mission" class="w-[80%]" />
        <span>* ~ 𝒇 𝙆𝙀𝙔𝙎 𝙛𝙖𝙣 𝙜𝙖𝙢𝙚 ~ *</span>
      </div>
    </div>
    <div class="relative">
      <div class="absolute w-full h-full flex justify-center items-center">
        <div>
          <!-- 제목 -->
          <h1
            class="font-founder text-2xl text-center mb-4 text-primary-300 tracking-wide animate-glowText"
          >
            크리스마스 선물 배달
          </h1>

          <!-- STEP 내용 -->

          <div class="space-y-6 text-center">
            <!-- STEP 1 -->

            <!-- <div
              class="border border-primary-400/40 bg-black/40 p-4 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-slate-200 animate-glowBox rounded-md"
            > -->
            임무를 끝까지 진행하면, <br />
            가장 닮은
            <span class="text-primary-300 font-semibold">fkeys 요원</span>이 안내됩니다.
            <!-- </div> -->
          </div>
        </div>
      </div>
      <img src="@/assets/imgs/info-box.png" alt="" class="-z-1 w-full mx-auto" />
    </div>
    <div class="flex flex-col gap-3 mx-[10%]">
      <UButton size="xl" class="p-3 text-2xl mt-10" block to="quiz"> 임무 시작 </UButton>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
