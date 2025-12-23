<template>
  <div v-if="activeShows.length > 0">
    <!-- 공연 목록 -->
    <div class="space-y-20">
      <div v-for="show in activeShows" :key="show.id">
        <div>
          <h4
            :class="show.color === 'purple' ? 'text-purple-400' : 'text-red-400'"
            class="text-xl md:text-2xl font-bold mb-3 tracking-wide"
          >
            {{ show.title }}
          </h4>
        </div>
        <div class="flex gap-3 items-start">
          <!-- 포스터 영역 -->
          <div class="flex items-center justify-center w-full grow">
            <div
              class="w-full aspect-[3/4] bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border border-slate-700/50 shadow-lg flex items-center justify-center relative overflow-hidden"
            >
              <img :src="show.poster" :alt="show.title" />
            </div>
          </div>

          <!-- 공연 정보 -->
          <div class="flex flex-col justify-center space-y-2 w-full">
            <div class="space-y-3">
              <div class="flex items-start gap-2.5 text-slate-100">
                <span
                  :class="show.color === 'purple' ? 'text-purple-400' : 'text-red-400'"
                  class="text-sm"
                >
                  {{ show.color === 'purple' ? '✧' : '★' }}
                </span>
                <div>
                  <p class="font-medium text-base">{{ show.date }}</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 text-slate-300">
                <span
                  :class="show.color === 'purple' ? 'text-purple-400' : 'text-red-400'"
                  class="text-sm"
                >
                  {{ show.color === 'purple' ? '✧' : '★' }}
                </span>
                <div>
                  <p class="text-sm">{{ show.time }}</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 text-slate-300">
                <span
                  :class="show.color === 'purple' ? 'text-purple-400' : 'text-red-400'"
                  class="text-sm"
                >
                  {{ show.color === 'purple' ? '✧' : '★' }}
                </span>
                <div>
                  <p class="text-sm">{{ show.venue }}</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 text-slate-300">
                <span
                  :class="show.color === 'purple' ? 'text-purple-400' : 'text-red-400'"
                  class="text-sm"
                >
                  {{ show.color === 'purple' ? '✧' : '★' }}
                </span>
                <div class="space-y-0.5">
                  <p class="text-sm">{{ show.price.adv }}</p>
                  <p class="text-sm">{{ show.price.door }}</p>
                </div>
              </div>

              <div
                :class="
                  show.color === 'purple'
                    ? 'text-purple-300 bg-purple-950/30 border-purple-900/50'
                    : 'text-red-300 bg-red-950/30 border-red-900/50'
                "
                class="flex items-center gap-3 rounded px-3 py-2 border"
              >
                <div>
                  <p class="text-sm font-semibold">{{ show.benefit }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 예매 버튼 -->
        <a :href="show.ticketUrl" target="_blank" rel="noopener noreferrer" class="block mt-2">
          <UButton
            :class="
              show.color === 'purple'
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-red-600 hover:bg-red-700'
            "
            size="xl"
            class="w-full items-center justify-center"
          >
            {{ show.color === 'purple' ? '✧' : '★' }} 예매하기
            {{ show.color === 'purple' ? '✧' : '★' }}
          </UButton>
        </a>
        <!-- 공지사항 -->
        <div v-if="show.notice" class="mt-4 text-xs">
          <p>{{ show.notice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import poster from '@/assets/imgs/poster.jpeg'
import poster01 from '@/assets/imgs/poster01.jpeg'

interface Show {
  id: string
  title: string
  date: string
  time: string
  venue: string
  price: {
    adv: string
    door: string
  }
  benefit: string
  ticketUrl: string
  poster: string
  endDate: string // ISO 형식 날짜
  notice?: string // 추가 공지사항
  color: 'red' | 'purple' // 테마 색상
}

const shows: Show[] = [
  {
    id: 'christmas',
    title: '【Idol Jewel Christmas】',
    date: '2025년 12월 25일 목요일',
    time: '입장 18:40 / 시작 19:00',
    venue: '아로아로홀',
    price: {
      adv: 'ADV ₩25,000',
      door: 'DOOR ₩25,000'
    },
    benefit: '지명 특전 : 특전권 1장',
    ticketUrl: 'https://aroarohall.imweb.me/ticket/?idx=236',
    poster: poster,
    endDate: '2025-12-26T00:00:00+09:00', // 공연 다음날
    color: 'red'
  },
  {
    id: 'countdown',
    title: '2026 Countdown LIVE\n➟ 【새해맞이잔치】',
    date: '2025년 12월 31일 수요일',
    time: '입장 23:10 / 시작 23:30',
    venue: '옥타바리움',
    price: {
      adv: 'ADV ₩25,000',
      door: 'DOOR ₩27,000'
    },
    benefit: '지명 특전 : 특전권 1장',
    ticketUrl: 'http://azito.kr/genba?id=2377',
    poster: poster01,
    endDate: '2026-01-01T03:00:00+09:00', // 새해 3시까지
    notice: '* 멤버 루나는 외부 임무로 불참합니다.',
    color: 'purple'
  }
]

// 현재 진행 중인 공연만 필터링
const activeShows = computed(() => {
  const now = new Date()
  return shows.filter((show) => new Date(show.endDate) > now)
})
</script>
