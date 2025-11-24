<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <Header />
    <NuxtLink to="/">
      <img src="/images/my-logo.svg" alt="My Logo" class="layout__logo" />
    </NuxtLink>

    <main class="layout__wrapper">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  padding-bottom: rem(80);
  background-color: var(--a-bg-primary);

  &__logo {
    position: fixed;
    top: 0;
    left: 0;
    max-width: rem(80);
    z-index: 10;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    @include tablet {
      max-width: rem(100);
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: rem(100) rem(12);

    @include tablet {
      max-width: rem(768);
      padding: rem(100) rem(40);
    }

    @include tabletMax {
      max-width: rem(832);
    }

    @include desktop {
      max-width: rem(1080);
    }
  }
}
</style>

