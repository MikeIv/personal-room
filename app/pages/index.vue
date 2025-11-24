<script setup lang="ts">
definePageMeta({
  title: "Главная страница",
  layout: "home",
});

// Version
const { data: versionData } = await useFetch<{ version: string }>("/version.json");
const appVersion = computed(() => versionData.value?.version || "1.0.0");

// Lang Switcher
const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

// Navigation items
const navItems = computed(() => [
  { key: "portf", path: "/portfolio" },
  { key: "tools", path: "/tools" },
  { key: "useful", path: "/useful" },
  { key: "sandbox", path: "/sandbox" },
  { key: "contacts", path: "/contacts" },
]);
</script>

<template>
  <section :class="$style.section">
    <!-- Анимированный фон с градиентами -->
    <div :class="$style.backgroundGradient"></div>
    
    <div :class="$style.block">
      <ALink
        href="https://github.com/MikeIv"
        :class="$style.link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub профиль"
      >
        <Icon name="custom:github" />
      </ALink>

      <NuxtLink
        v-for="localeItem in availableLocales"
        :key="localeItem.code"
        :to="switchLocalePath(localeItem.code)"
        :class="[$style.lang, 'a-font__s']"
        :aria-label="`Переключить язык на ${localeItem.name}`"
      >
        {{ localeItem.name }}
      </NuxtLink>
    </div>

    <nav :class="$style.nav" aria-label="Основная навигация">
      <ul :class="$style.navList">
        <li 
          v-for="(item, index) in navItems" 
          :key="item.key"
          :class="$style.navListItem"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <NuxtLink
            :class="[$style.navItem, 'a-font__h4']"
            :to="localePath(item.path)"
          >
            <span :class="$style.navItemText">
              {{ t(`navigation.${item.key}`) }}
            </span>
            <span :class="$style.navItemUnderline"></span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <p :class="[$style.attention, 'a-font__s']">
      {{ t("info.develop") }} <span>(v{{ appVersion }})</span>
    </p>
  </section>
</template>

<style module lang="scss">
@use "~/assets/styles/tools/functions" as *;

.section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.backgroundGradient {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 30% 50%,
    rgba(34, 197, 94, 0.08) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 70% 50%,
    rgba(59, 130, 246, 0.06) 0%,
    transparent 50%
  );
  animation: gradientShift 20s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes gradientShift {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(5%, 5%) rotate(5deg);
  }
}

.attention {
  position: absolute;
  bottom: rem(20);
  left: rem(20);
  z-index: 1;
  color: var(--a-text-secondary);
  text-transform: uppercase;
  opacity: 0.5;
  user-select: none;
  animation: fadeInUp 0.8s ease-out 0.6s both;
  font-size: rem(10);

  span {
    text-transform: none;
  }
}

.block {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: rem(40);
  height: rem(40);
  margin: rem(20);
  gap: rem(8);
}

.link,
.lang {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: rem(40);
  height: rem(40);
  color: var(--a-text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--a-borderR--x6);
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--a-text-primary);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }
}

.link {
  :global(.nuxt-icon) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(24);
    height: rem(24);
    transition: transform 0.3s ease;
  }

  &:hover :global(.nuxt-icon) {
    transform: scale(1.1) rotate(5deg);
  }
}

.lang {
  text-transform: uppercase;
  background: linear-gradient(135deg, var(--a-bg-secondary), var(--a-bg-accent));
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: var(--a-borderR--x6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
    border-color: rgba(34, 197, 94, 0.3);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
  }
}

.nav {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.navList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: rem(18);
}

.navListItem {
  animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navItem {
  position: relative;
  display: inline-block;
  padding: rem(12) rem(24);
  font-weight: var(--font-weight-normal);
  color: var(--a-text-primary);
  text-transform: uppercase;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--a-borderR--x6);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(59, 130, 246, 0.08));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  .navItemText {
    position: relative;
    z-index: 1;
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .navItemUnderline {
    position: absolute;
    bottom: rem(8);
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.6), transparent);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  &:hover {
    color: var(--a-text-primary);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }

    .navItemText {
      transform: translateX(4px);
    }

    .navItemUnderline {
      transform: translateX(-50%) scaleX(1);
    }
  }

  &.router-link-exact-active {
    font-weight: var(--font-weight-medium);
    color: var(--a-text-primary);

    &::before {
      opacity: 1;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.15));
    }

    .navItemUnderline {
      transform: translateX(-50%) scaleX(1);
      background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.8), transparent);
    }
  }
}
</style>
