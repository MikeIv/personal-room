<script setup lang="ts">
definePageMeta({
  title: "Полезное",
  layout: "default",
});
</script>

<template>
  <section class="useful layout__wrapper">
    <h1 class="useful__title a-font__h1 hidden">Полезное</h1>
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
  &__title {
    margin-bottom: rem(32);
  }

  &__block {
    margin-bottom: rem(48);

    &:last-child {
      margin-bottom: 0;
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
    display: flex;
    align-items: center;
    gap: rem(12);
    padding: rem(16);
    border: 1px solid var(--a-border-light);
    border-radius: var(--a-borderR--card);
    color: var(--a-text-primary);
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

  &__block-item-logo {
    width: rem(24);
    height: rem(24);
    object-fit: contain;
  }
}
</style>

