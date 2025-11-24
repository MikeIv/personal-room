<script setup lang="ts">
defineProps({
  link: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <NuxtLink :to="link" class="button-back">
    <span class="a-font__s">назад</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.button-back {
  display: inline-flex;
  align-items: center;
  padding: rem(8) rem(16);
  color: var(--a-text-secondary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--a-text-primary);
  }
}
</style>

