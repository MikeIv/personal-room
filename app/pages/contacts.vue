<script setup lang="ts">
definePageMeta({
  title: "Контакты",
  layout: "default",
});
</script>

<template>
  <section class="contacts layout__wrapper">
    <div class="contacts__header">
      <h1 class="contacts__title a-font__h1">Контакты</h1>
      <p class="contacts__description a-font__m">
        Свяжитесь со мной через один из указанных способов
      </p>
    </div>

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
  width: 100%;

  &__header {
    margin-bottom: rem(48);
    padding-bottom: rem(32);
    border-bottom: 1px solid var(--a-border-light);
  }

  &__title {
    margin-bottom: rem(16);
    color: var(--a-text-primary);
    font-weight: var(--font-weight-bold);
  }

  &__description {
    color: var(--a-text-secondary);
    line-height: var(--line-height-relaxed);
    max-width: rem(600);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: rem(24);
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: rem(16);
    padding: rem(20);
    border: 1px solid var(--a-border-light);
    border-radius: var(--a-borderR--card);
    transition: all 0.3s ease;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--a-color-blue);
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    // Разные цвета для разных контактов
    &:nth-child(1)::before {
      background: var(--a-color-teal);
    }

    &:nth-child(2)::before {
      background: var(--a-color-pink);
    }

    &:hover {
      border-color: var(--a-border-medium);
      background-color: var(--a-bg-secondary);
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      &::before {
        transform: scaleY(1);
      }

      :deep(.nuxt-icon) {
        transform: scale(1.1);
      }
    }

    :deep(.nuxt-icon) {
      width: rem(24);
      height: rem(24);
      color: var(--a-text-secondary);
      transition: all 0.3s ease;

      &:nth-child(1) {
        color: var(--a-color-teal);
      }
    }

    &:nth-child(2) :deep(.nuxt-icon) {
      color: var(--a-color-pink);
    }
  }

  &__txt {
    color: var(--a-text-primary);
    font-size: var(--font-size-lg);
  }
}
</style>

