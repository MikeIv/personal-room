<script setup lang="ts">
const localePath = useLocalePath();

const { isMobile, isTabled, isDesktop } = useResponsive();

const showNav = ref(false);

const toggleNav = () => {
  showNav.value = !showNav.value;
};

// Lang Switcher
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <section class="header" :class="{ mobile: isMobile }">
    <nav v-if="isDesktop || isTabled" class="header__nav">
      <ul class="header__nav-list">
        <NuxtLink class="header__item a-font__s" :to="localePath('/portfolio')">
          {{ $t("navigation.portf") }}
        </NuxtLink>
        <NuxtLink class="header__item a-font__s" :to="localePath('/tools')">
          {{ $t("navigation.tools") }}
        </NuxtLink>
        <NuxtLink class="header__item a-font__s" :to="localePath('/useful')">
          {{ $t("navigation.useful") }}
        </NuxtLink>
        <NuxtLink class="header__item a-font__s" :to="localePath('/sandbox')">
          {{ $t("navigation.sandbox") }}
        </NuxtLink>
        <NuxtLink class="header__item a-font__s" :to="localePath('/contacts')">
          {{ $t("navigation.contacts") }}
        </NuxtLink>
      </ul>
    </nav>

    <div class="header__block">
      <a href="https://github.com/MikeIv" class="header__link" target="_blank">
        <Icon name="custom:github" class="header__icon" />
      </a>

      <NuxtLink
        class="header__lang a-font__s"
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        {{ locale.name }}
      </NuxtLink>
    </div>

    <div v-if="isMobile" class="header__mobile-toggle">
      <button
        class="header__toggle-nav"
        :class="{ active: showNav }"
        @click="toggleNav"
      >
        <span></span>
      </button>

      <nav v-if="showNav" class="header__mobile-menu">
        <ul class="header__nav-list header__nav-list--mob">
          <NuxtLink
            class="header__item-mob a-font__m"
            :to="localePath('/portfolio')"
            @click="toggleNav"
          >
            {{ $t("navigation.portf") }}
          </NuxtLink>
          <NuxtLink
            class="header__item-mob a-font__m"
            :to="localePath('/tools')"
            @click="toggleNav"
          >
            {{ $t("navigation.tools") }}
          </NuxtLink>
          <NuxtLink
            class="header__item-mob a-font__m"
            :to="localePath('/useful')"
            @click="toggleNav"
          >
            {{ $t("navigation.useful") }}
          </NuxtLink>
          <NuxtLink
            class="header__item-mob a-font__m"
            :to="localePath('/sandbox')"
            @click="toggleNav"
          >
            {{ $t("navigation.sandbox") }}
          </NuxtLink>
          <NuxtLink
            class="header__item-mob a-font__m"
            :to="localePath('/contacts')"
            @click="toggleNav"
          >
            {{ $t("navigation.contacts") }}
          </NuxtLink>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: rem(48);
  padding: 0 rem(30);
  background-color: var(--a-bg-primary);
  border-bottom: 1px solid var(--a-border-light);
  z-index: 5;

  &.mobile {
    justify-content: flex-end;
  }

  &__mobile {
    &-toggle {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: rem(20);
      height: rem(20);
      margin-left: rem(20);
    }

    &-menu {
      position: absolute;
      top: rem(33);
      right: rem(-30);
      display: flex;
      flex-direction: column;
      min-width: rem(150);
      min-height: rem(200);
      padding: rem(30);
      background-color: var(--a-bg-primary);
      border: 1px solid var(--a-border-light);
      border-radius: var(--a-borderR--x6);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  &__toggle-nav {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;

    span {
      position: relative;
      width: 100%;
      height: rem(2);
      background-color: var(--a-text-primary);
      transition: all 0.3s ease;

      &::before,
      &::after {
        position: absolute;
        content: "";
        left: 0;
        width: 100%;
        height: rem(2);
        background-color: var(--a-text-primary);
        transition: all 0.3s ease;
      }

      &::before {
        top: rem(-5);
      }
      &::after {
        top: rem(5);
      }
    }

    &.active {
      span {
        height: 0;

        &::before {
          top: rem(-1);
          transform: rotate(45deg);
        }
        &::after {
          top: rem(-1);
          transform: rotate(-45deg);
        }
      }
    }
  }

  &__nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    &-list {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: rem(16);

      &--mob {
        flex-direction: column;
        align-items: flex-start;
        gap: rem(12);
      }
    }
  }

  &__item {
    color: var(--a-text-secondary);
    text-transform: uppercase;
    user-select: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--a-text-primary);
    }

    &.router-link-exact-active {
      color: var(--a-text-primary);
      font-weight: var(--font-weight-medium);
    }

    &-mob {
      padding: rem(4) 0;
      color: var(--a-text-secondary);
      transition: color 0.2s ease;

      &:hover {
        color: var(--a-text-primary);
      }

      &.router-link-exact-active {
        color: var(--a-text-primary);
        font-weight: var(--font-weight-medium);
      }
    }
  }

  &__block {
    display: flex;
    align-items: center;
    gap: rem(8);
  }

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(40);
    height: rem(40);
    color: var(--a-text-secondary);
    transition: color 0.2s ease;

    &:hover {
      color: var(--a-text-primary);
    }
  }

  &__icon {
    width: rem(24);
    height: rem(24);
  }

  &__lang {
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(40);
    height: rem(40);
    color: var(--a-text-secondary);
    text-transform: uppercase;
    background-color: var(--a-bg-secondary);
    border-radius: var(--a-borderR--x6);
    transition: all 0.2s ease;

    &:hover {
      color: var(--a-text-primary);
      background-color: var(--a-bg-accent);
    }
  }
}
</style>

