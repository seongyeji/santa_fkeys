<template>
  <div
    class="relative rounded-xl p-6 md:p-8 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700/60"
  >
    <!-- 헤더 -->
    <div class="text-center mb-6">
      <h3 class="text-xl md:text-2xl font-bold text-slate-100 mb-2">FKEYS on X (Twitter)</h3>
      <p class="text-slate-400 text-sm">팔로우하고 최신 소식을 받아보세요</p>
    </div>

    <!-- 그룹 계정 -->
    <div class="mb-6">
      <p class="text-blue-300 text-sm font-semibold mb-3 flex items-center gap-2">
        <span class="text-lg">✧</span>
        <span>Official Account</span>
      </p>
      <a :href="OFFICIAL_TWITTER.url" target="_blank" rel="noopener noreferrer" class="block">
        <UButton
          color="neutral"
          variant="solid"
          size="xl"
          class="w-full items-center justify-center group hover:scale-[1.02] transition-transform"
        >
          <div class="flex items-center gap-2">
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
            <span class="font-bold">@fkeysofficial</span>
          </div>
        </UButton>
      </a>
    </div>

    <!-- 멤버 계정 -->
    <div class="space-y-3">
      <p class="text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
        <span class="text-lg">★</span>
        <span>Member Accounts</span>
      </p>

      <a
        v-for="member in members"
        :key="member.handle"
        :href="`https://twitter.com/${member.handle}`"
        target="_blank"
        rel="noopener noreferrer"
        class="block"
      >
        <div
          class="bg-slate-700/40 hover:bg-slate-700/50 rounded-lg p-3 border border-slate-700/40 hover:border-slate-600/60 transition-all group"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img
                :src="member.profileImage"
                :alt="member.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p class="text-slate-100 font-medium">{{ member.name }}</p>
                <p class="text-slate-400 text-sm">@{{ member.handle }}</p>
              </div>
            </div>
            <svg
              class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </div>
        </div>
      </a>
    </div>

    <!-- 하단 라인 -->
    <div
      class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
    />
  </div>
</template>

<script setup lang="ts">
import { TWITTER_HANDLES, MEMBER_NAMES, OFFICIAL_TWITTER, type MemberKey } from '~/data/members'
import lenaProfile from '@/assets/imgs/profile/lena.jpg'
import runaProfile from '@/assets/imgs/profile/runa.jpg'
import dowonProfile from '@/assets/imgs/profile/dowon.jpg'
import rahelProfile from '@/assets/imgs/profile/rahel.jpg'

interface Member {
  name: string
  handle: string
  profileImage: string
}

const profileImages: Record<MemberKey, string> = {
  lena: lenaProfile,
  runa: runaProfile,
  dowon: dowonProfile,
  rahel: rahelProfile
}

const memberKeys: MemberKey[] = ['dowon', 'rahel', 'lena', 'runa']

const members: Member[] = memberKeys.map((key) => ({
  name: MEMBER_NAMES[key],
  handle: TWITTER_HANDLES[key],
  profileImage: profileImages[key]
}))
</script>
