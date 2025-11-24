<script setup lang="ts">
definePageMeta({
  title: "Js",
  layout: "default",
});
</script>

<template>
  <section class="page layout__wrapper">
    <ButtonBack link="/useful" />
    <PageTitle title="Js" />
    <div class="page__content">
      <p class="a-font__m">Страница в разработке</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page {
  &__content {
    color: var(--a-text-primary);
  }
}
</style>

