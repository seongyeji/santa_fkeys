<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// App-level setup can go here
useHead({
  titleTemplate: '%s - Santa FKeys',
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
