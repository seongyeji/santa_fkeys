<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in'
        }"
      />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// App-level setup can go here
useHead({
  titleTemplate: '%s - Santa FKeys',
  htmlAttrs: {
    lang: 'ko'
  }
})
</script>

<style>
/* 페이지 전환 애니메이션 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
