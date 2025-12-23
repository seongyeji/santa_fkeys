// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/eslint', '@nuxt/image'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'FKEYS 크리스마스 테스트',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      meta: [
        { name: 'description', content: '당신과 비슷한 FKEYS 요원을 찾아보세요!' },
        { property: 'og:title', content: 'FKEYS 크리스마스 테스트' },
        { property: 'og:description', content: '당신과 비슷한 FKEYS 요원을 찾아보세요!' },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'FKEYS 크리스마스 테스트' },
        { name: 'twitter:description', content: '당신과 비슷한 FKEYS 요원을 찾아보세요!' },
        { name: 'twitter:image', content: '/og.png' }
      ]
    }
  },

  colorMode: {
    preference: 'dark', // ⭐ 기본값을 다크로
    fallback: 'dark',
    classSuffix: ''
  },

  compatibilityDate: '2024-11-01',

  typescript: {
    strict: true,
    typeCheck: true
  },

  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single'
      }
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },

  runtimeConfig: {
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY
  }
})
