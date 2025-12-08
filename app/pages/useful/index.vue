<script setup lang="ts">
definePageMeta({
  title: "Полезное",
  layout: "default",
});
</script>

<template>
  <section class="useful layout__wrapper">
    <div class="useful__header">
      <h1 class="useful__title a-font__h1">Полезное</h1>
      <p class="useful__description a-font__m">
        Полезные материалы, сниппеты и статьи для разработки
      </p>
    </div>
    <div class="useful__block">
      <h2 class="useful__block-header a-font__h3">Сниппеты</h2>
      <ul class="useful__block-list">
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/snippets-css/css"
            class="useful__block-link a-font__m"
          >
            <Icon name="custom:css" filled />
            <span class="a-font__s">Сниппеты CSS и SASS</span>
          </NuxtLink>
        </li>
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/snippets-js/js"
            class="useful__block-link a-font__m"
          >
            <Icon name="custom:js" filled />
            <span class="a-font__s">Сниппеты JavaScript</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="useful__block">
      <h2 class="useful__block-header a-font__h3">Разное</h2>
      <ul class="useful__block-list">
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/different/console"
            class="useful__block-link a-font__m"
          >
            <img
              class="useful__block-item-logo"
              src="/images/logo-cmder-light.jpg"
              alt="logo"
            />
            <span class="a-font__s">Консольные команды</span>
          </NuxtLink>
        </li>
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/different/hint"
            class="useful__block-link a-font__m"
          >
            <Icon name="custom:js" filled />
            <span class="a-font__s">Шпаргалка</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="useful__block">
      <h2 class="useful__block-header a-font__h3">Статьи</h2>
      <ul class="useful__block-list">
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/articles/vue-nuxt"
            class="useful__block-link a-font__m"
          >
            <Icon name="custom:articles-ltr" filled />
            <span class="a-font__s">Vue 3 & Nuxt</span>
          </NuxtLink>
        </li>
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/articles/html"
            class="useful__block-link a-font__m"
          >
            <Icon name="custom:articles-ltr" filled />
            <span class="a-font__s">Html</span>
          </NuxtLink>
        </li>
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/articles/js"
            class="useful__block-link a-font__m"
          >
            <Icon name="custom:articles-ltr" filled />
            <span class="a-font__s">Js</span>
          </NuxtLink>
        </li>
        <li class="useful__block-item">
          <NuxtLink
            to="/useful/articles/htmlacademy"
            class="useful__block-link a-font__m"
          >
            <Icon name="custom:articles-ltr" filled />
            <span class="a-font__s">HTML, CSS, JS...</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.useful {
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

  &__block {
    margin-bottom: rem(48);

    &:last-child {
      margin-bottom: 0;
    }

    // Цветовые акценты для разных категорий
    &:nth-child(1) .useful__block-link {
      &::before {
        background: var(--a-color-blue-bg);
      }

      &:hover {
        border-color: var(--a-color-blue);
        box-shadow: 0 4px 12px var(--a-color-blue-bg);
      }

      :deep(.nuxt-icon) {
        color: var(--a-color-blue);
      }
    }

    &:nth-child(2) .useful__block-link {
      &::before {
        background: var(--a-color-purple-bg);
      }

      &:hover {
        border-color: var(--a-color-purple);
        box-shadow: 0 4px 12px var(--a-color-purple-bg);
      }

      :deep(.nuxt-icon) {
        color: var(--a-color-purple);
      }
    }

    &:nth-child(3) .useful__block-link {
      &::before {
        background: var(--a-color-green-bg);
      }

      &:hover {
        border-color: var(--a-color-green);
        box-shadow: 0 4px 12px var(--a-color-green-bg);
      }

      :deep(.nuxt-icon) {
        color: var(--a-color-green);
      }
    }
  }

  &__block-header {
    margin-bottom: rem(24);
    color: var(--a-text-primary);
  }

  &__block-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: rem(16);
  }

  &__block-item {
    list-style: none;
  }

  &__block-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: rem(12);
    padding: rem(16);
    border: 1px solid var(--a-border-light);
    border-radius: var(--a-borderR--card);
    color: var(--a-text-primary);
    transition: all 0.3s ease;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }


    &:hover {
      transform: translateY(-2px);

      &::before {
        opacity: 1;
      }

      :deep(.nuxt-icon),
      .useful__block-item-logo {
        transform: scale(1.1) rotate(5deg);
      }
    }

    > * {
      position: relative;
      z-index: 1;
    }

    :deep(.nuxt-icon) {
      width: rem(24);
      height: rem(24);
      color: var(--a-text-secondary);
      transition: all 0.3s ease;
    }
  }

  &__block-item-logo {
    width: rem(24);
    height: rem(24);
    object-fit: contain;
    transition: all 0.3s ease;
  }
}
</style>

