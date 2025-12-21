<template>
  <div class="flex justify-center">
    <UButton
      v-if="canGoPrevious"
      size="xl"
      variant="outline"
      color="primary"
      trailing-icon="solar:alt-arrow-left-broken"
      class="backdrop-blur-2xl"
      @click="$emit('previous')"
    >
      이전
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  canGoPrevious: boolean
}>()

defineEmits<{
  previous: []
}>()
</script>
