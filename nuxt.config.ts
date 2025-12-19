// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/eslint'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
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
})
