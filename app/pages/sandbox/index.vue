<script setup lang="ts">
definePageMeta({
  title: "Песочница",
  layout: "default",
});

// Components Title
const { listItems } = componentsTitle();
</script>

<template>
  <section class="sandbox layout__wrapper">
    <h1 class="sandbox__title a-font__h1 hidden">Vue 3 Nuxt 4</h1>
    <h2 class="sandbox__subtitle a-font__h2">Компоненты и методы</h2>

    <div class="sandbox__section sandbox__section-pages-links">
      <h3 class="sandbox__links-title a-font__h3">Компоненты</h3>
      <ul class="sandbox__pages-links">
        <li
          class="sandbox__pages-links-item"
          v-for="item in listItems"
          :key="item.id"
        >
          <NuxtLink :to="item.path" class="sandbox__block-link a-font__m">
            <span class="a-font__s">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sandbox {
  &__title {
    margin-bottom: rem(32);
  }

  &__subtitle {
    margin-bottom: rem(48);
    color: var(--a-text-primary);
  }

  &__section {
    margin-bottom: rem(48);
  }

  &__links-title {
    margin-bottom: rem(24);
    color: var(--a-text-primary);
  }

  &__pages-links {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: rem(16);
  }

  &__pages-links-item {
    list-style: none;
  }

  &__block-link {
    display: flex;
    align-items: center;
    padding: rem(16);
    border: 1px solid var(--a-border-light);
    border-radius: var(--a-borderR--card);
    color: var(--a-text-primary);
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--a-border-medium);
      background-color: var(--a-bg-secondary);
    }
  }
}
</style>

