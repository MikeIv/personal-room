<script setup lang="ts">
definePageMeta({
  title: "Контакты",
  layout: "default",
});
</script>

<template>
  <section class="contacts layout__wrapper">
    <h1 class="contacts__title a-font__h1 hidden">Контакты</h1>

    <div class="contacts__section">
      <a href="https://t.me/Mike_Iv" class="contacts__item" target="_blank">
        <Icon name="custom:telegram" />
        <p class="contacts__txt">@Mike_Iv</p>
      </a>
      <a
        href="mailto:mike@ivanov-post.ru"
        class="contacts__item"
        target="_blank"
      >
        <Icon name="custom:mail" />
        <p class="contacts__txt">mike@ivanov-post.ru</p>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacts {
  &__title {
    margin-bottom: rem(32);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: rem(24);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: rem(16);
    padding: rem(20);
    border: 1px solid var(--a-border-light);
    border-radius: var(--a-borderR--card);
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--a-border-medium);
      background-color: var(--a-bg-secondary);
    }

    :deep(.nuxt-icon) {
      width: rem(24);
      height: rem(24);
      color: var(--a-text-secondary);
    }
  }

  &__txt {
    color: var(--a-text-primary);
    font-size: var(--font-size-lg);
  }
}
</style>

