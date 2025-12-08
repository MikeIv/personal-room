<script setup lang="ts">
definePageMeta({
  title: "Компоненты",
  layout: "default",
});

// Здесь будет список компонентов для переиспользования
const componentsList = ref<Array<{
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
}>>([]);

// Пока список пустой, но структура готова для добавления компонентов
</script>

<template>
  <section :class="[$style.components, 'layout__wrapper']">
    <div :class="$style.pageHeader">
      <h1 :class="[$style.pageTitle, 'a-font__h1']">Компоненты</h1>
      <p :class="[$style.pageDescription, 'a-font__m']">
        Коллекция переиспользуемых компонентов и модулей для использования в других проектах
      </p>
    </div>

    <div v-if="componentsList.length === 0" :class="$style.empty">
      <p :class="[$style.emptyText, 'a-font__m']">
        Здесь будут размещены готовые компоненты и модули
      </p>
    </div>

    <div v-else :class="$style.content">
      <!-- Здесь будет список компонентов -->
      <ul :class="$style.componentsList">
        <li
          v-for="component in componentsList"
          :key="component.id"
          :class="$style.componentItem"
        >
          <!-- Структура для будущих компонентов -->
        </li>
      </ul>
    </div>
  </section>
</template>

<style module lang="scss">
.components {
  width: 100%;
}

.pageHeader {
  margin-bottom: rem(48);
  padding-bottom: rem(32);
  border-bottom: 1px solid var(--a-border-light);
}

.pageTitle {
  margin-bottom: rem(16);
  color: var(--a-text-primary);
  font-weight: var(--font-weight-bold);
}

.pageDescription {
  color: var(--a-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: rem(600);
}

.empty {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: rem(400);
  padding: rem(48);
  border: 1px dashed var(--a-border-light);
  border-radius: var(--a-borderR--card);
  background: linear-gradient(135deg, var(--a-bg-secondary) 0%, var(--a-color-blue-bg) 50%, var(--a-bg-secondary) 100%);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--a-color-blue), var(--a-color-purple), var(--a-color-orange), var(--a-color-teal));
    background-size: 200% 100%;
    animation: gradientMove 2s linear infinite;
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

.emptyText {
  color: var(--a-text-secondary);
  text-align: center;
}

.content {
  width: 100%;
}

.componentsList {
  display: grid;
  grid-template-columns: 1fr;
  gap: rem(24);
  width: 100%;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }
}

.componentItem {
  position: relative;
  padding: rem(24);
  border: 1px solid var(--a-border-light);
  border-radius: var(--a-borderR--card);
  background-color: var(--a-bg-primary);
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--a-color-blue), var(--a-color-purple), var(--a-color-orange));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  // Цветовые акценты для разных карточек
  &:nth-child(3n + 1)::before {
    background: var(--a-color-blue);
  }

  &:nth-child(3n + 2)::before {
    background: var(--a-color-purple);
  }

  &:nth-child(3n + 3)::before {
    background: var(--a-color-orange);
  }

  &:hover {
    border-color: var(--a-border-medium);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }

    &:nth-child(3n + 1) {
      box-shadow: 0 8px 24px var(--a-color-blue-bg-hover);
    }

    &:nth-child(3n + 2) {
      box-shadow: 0 8px 24px var(--a-color-purple-bg-hover);
    }

    &:nth-child(3n + 3) {
      box-shadow: 0 8px 24px var(--a-color-orange-bg-hover);
    }
  }
}
</style>

