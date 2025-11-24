<script setup lang="ts">
</script>

<template>
  <div class="layout layout-home">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.layout {
  &-home {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: var(--a-bg-primary);
  }
}
</style>

