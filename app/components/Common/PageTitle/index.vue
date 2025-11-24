<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Заголовок по умолчанию",
  },
});
</script>

<template>
  <h1 class="page-title a-font__h1">{{ title }}</h1>
</template>

<style scoped lang="scss">
.page-title {
  margin-bottom: rem(32);
  color: var(--a-text-primary);
}
</style>

