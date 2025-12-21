<template>
  <div
    class="relative rounded-xl p-6 md:p-8 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700/60 shadow-[0_0_40px_rgba(239,68,68,0.15)]"
  >
    <!-- 헤더 -->
    <div class="text-center mb-6">
      <div class="inline-block mb-2">
        <span class="text-red-400 text-xs md:text-sm font-bold tracking-widest animate-pulse">
          #🎹 ₊*̥ 𝗨𝗥𝗚𝗘𝗡𝗧! #임무발생
        </span>
      </div>
      <h3
        class="text-xl md:text-2xl font-semibold tracking-widest text-slate-100 mb-1 flex items-center justify-center gap-2"
      >
        <span class="text-red-400">MISSION</span>
        <span class="text-slate-400 text-base">DETECTED</span>
      </h3>
      <p class="text-2xl md:text-3xl font-black text-white mt-2">₊*̥𝒇 𝙆𝙀𝙔𝙎 𝙇𝙄𝙑𝙀 ̳͟͞͞❤︎</p>
      <p class="text-red-300 text-sm md:text-base font-medium mt-1">#FKEYS_LIVE</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- 포스터 영역 -->
      <div class="flex items-center justify-center">
        <div
          class="w-full aspect-[3/4] bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border border-slate-700/50 shadow-lg flex items-center justify-center relative overflow-hidden"
        >
          <!-- 스캔 라인 효과 -->
          <img src="@/assets/imgs/poster.jpeg" alt="" />
        </div>
      </div>

      <!-- 공연 정보 -->
      <div class="flex flex-col justify-center space-y-4">
        <div>
          <h4 class="text-xl md:text-2xl font-bold text-red-400 mb-3 tracking-wide">
            【Idol Jewel Christmas】
          </h4>
        </div>

        <div class="space-y-3">
          <div class="flex items-center gap-3 text-slate-100">
            <span class="text-red-400 text-lg">❤︎</span>
            <div>
              <p class="font-medium text-base">2025년 12월 25일 목요일</p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-slate-300">
            <span class="text-red-400 text-lg">❤︎</span>
            <div>
              <p class="text-sm">입장 18:40 / 시작 19:00</p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-slate-300">
            <span class="text-red-400 text-lg">❤︎</span>
            <div>
              <p class="text-sm">아로아로홀</p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-slate-300">
            <span class="text-red-400 text-lg">❤︎</span>
            <div>
              <p class="text-sm">ADV ₩25,000 | DOOR ₩25,000</p>
            </div>
          </div>

          <div
            class="flex items-center gap-3 text-red-300 bg-red-950/30 rounded px-3 py-2 border border-red-900/50"
          >
            <span class="text-lg">🪪</span>
            <div>
              <p class="text-sm font-semibold">지명 특전 : 특전권 1장</p>
            </div>
          </div>
        </div>

        <!-- 예매 버튼 -->
        <a
          href="https://aroarohall.imweb.me/ticket/?idx=236"
          target="_blank"
          rel="noopener noreferrer"
          class="block mt-2"
        >
          <UButton
            size="xl"
            color="error"
            variant="solid"
            block
            class="font-bold text-base shadow-lg hover:scale-105 transition-transform"
          >
            ❤︎ 예매하기 ❤︎
          </UButton>
        </a>
      </div>
    </div>

    <!-- 하단 라인 -->
    <div
      class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
    />
  </div>
</template>

<script setup lang="ts">
// 공연 홍보 카드 컴포넌트
</script>
