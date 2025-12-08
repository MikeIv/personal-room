<script setup lang="ts">
const route = useRoute();

// Маппинг маршрутов на цвета из теплой палитры
const pageColors = {
  '/portfolio': {
    primary: 'rgba(249, 115, 22, 0.1)', // оранжевый
    secondary: 'rgba(59, 130, 246, 0.08)', // синий
    tertiary: 'rgba(168, 85, 247, 0.04)', // фиолетовый
  },
  '/tools': {
    primary: 'rgba(239, 68, 68, 0.1)', // красный
    secondary: 'rgba(59, 130, 246, 0.08)', // синий
    tertiary: 'rgba(168, 85, 247, 0.04)', // фиолетовый
  },
  '/components': {
    primary: 'rgba(236, 72, 153, 0.1)', // розовый
    secondary: 'rgba(59, 130, 246, 0.08)', // синий
    tertiary: 'rgba(168, 85, 247, 0.04)', // фиолетовый
  },
  '/useful': {
    primary: 'rgba(251, 191, 36, 0.1)', // желтый/золотой
    secondary: 'rgba(59, 130, 246, 0.08)', // синий
    tertiary: 'rgba(168, 85, 247, 0.04)', // фиолетовый
  },
  '/sandbox': {
    primary: 'rgba(255, 159, 64, 0.1)', // персиковый/абрикосовый
    secondary: 'rgba(59, 130, 246, 0.08)', // синий
    tertiary: 'rgba(168, 85, 247, 0.04)', // фиолетовый
  },
  '/contacts': {
    primary: 'rgba(255, 107, 107, 0.1)', // коралловый
    secondary: 'rgba(59, 130, 246, 0.08)', // синий
    tertiary: 'rgba(168, 85, 247, 0.04)', // фиолетовый
  },
};

// Определяем текущий путь (без локали)
const currentPath = computed(() => {
  const path = route.path;
  // Убираем префикс локали если есть
  return path.replace(/^\/[a-z]{2}(\/|$)/, '/') || '/';
});

// Получаем цвета для текущей страницы или используем дефолтные
const currentColors = computed(() => {
  // Проверяем точное совпадение
  if (pageColors[currentPath.value as keyof typeof pageColors]) {
    return pageColors[currentPath.value as keyof typeof pageColors];
  }
  
  // Проверяем вложенные маршруты (например, /useful/snippets-css/css)
  for (const [path, colors] of Object.entries(pageColors)) {
    if (currentPath.value.startsWith(path)) {
      return colors;
    }
  }
  
  // Дефолтные цвета (оранжевый как для portfolio)
  return pageColors['/portfolio'];
});

// Стили для динамического фона
const backgroundStyle = computed(() => ({
  '--gradient-primary': currentColors.value.primary,
  '--gradient-secondary': currentColors.value.secondary,
  '--gradient-tertiary': currentColors.value.tertiary,
}));
</script>

<template>
  <div class="layout" :style="backgroundStyle">
    <!-- Анимированный фон с динамическими цветами -->
    <div class="backgroundGradient"></div>

    <Header />

    <main class="layout__wrapper">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/tools/functions" as *;

.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  padding-bottom: rem(60);
  background-color: var(--a-bg-primary);
  overflow: hidden;

  &__wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: rem(80) rem(16) rem(40);
    padding-top: calc(rem(80) + env(safe-area-inset-top, 0));

    @include tablet {
      max-width: rem(768);
      padding: rem(96) rem(32) rem(60);
      padding-top: calc(rem(96) + env(safe-area-inset-top, 0));
    }

    @include tabletMax {
      max-width: rem(832);
      padding: rem(108) rem(40) rem(80);
      padding-top: calc(rem(108) + env(safe-area-inset-top, 0));
    }

    @include desktop {
      max-width: rem(1200);
      padding: rem(120) rem(48) rem(100);
      padding-top: calc(rem(120) + env(safe-area-inset-top, 0));
    }
  }
}

// Анимированный фон с динамическими цветами для каждой страницы
.backgroundGradient {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    circle at 25% 40%,
    var(--gradient-primary) 0%,
    transparent 45%
  ),
  radial-gradient(
    circle at 75% 60%,
    var(--gradient-secondary) 0%,
    transparent 45%
  ),
  radial-gradient(
    circle at 50% 20%,
    var(--gradient-tertiary) 0%,
    transparent 40%
  );
  animation: gradientShiftVariant2 25s ease-in-out infinite;
}

@keyframes gradientShiftVariant2 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    transform: translate(-3%, 3%) rotate(-3deg) scale(1.05);
  }
  66% {
    transform: translate(3%, -3%) rotate(3deg) scale(0.98);
  }
}
</style>

