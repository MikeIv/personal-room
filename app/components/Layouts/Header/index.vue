<script setup lang="ts">
const localePath = useLocalePath();

const { isMobile, isTabled, isDesktop } = useResponsive();

const showNav = ref(false);

const toggleNav = () => {
  showNav.value = !showNav.value;
};

// Navigation
const { navItems } = useNavigation();
const { t } = useI18n();

// Lang Switcher
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <section class="header" :class="{ mobile: isMobile }">
    <NuxtLink :to="localePath('/')" class="header__logo">
      <img src="/images/my-logo.svg" alt="My Logo" />
    </NuxtLink>
    
    <nav v-if="isDesktop || isTabled" class="header__nav">
      <ul class="header__nav-list">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          class="header__item a-font__s"
          :to="localePath(item.path)"
        >
          {{ t(`navigation.${item.key}`) }}
        </NuxtLink>
      </ul>
    </nav>

    <div class="header__block">
      <a href="https://github.com/MikeIv" class="header__link" target="_blank">
        <Icon name="custom:github" class="header__icon" />
      </a>

      <NuxtLink
        v-for="localeItem in availableLocales"
        :key="localeItem.code"
        class="header__lang a-font__s"
        :to="switchLocalePath(localeItem.code)"
      >
        {{ localeItem.name }}
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
            v-for="item in navItems"
            :key="item.key"
            class="header__item-mob a-font__m"
            :to="localePath(item.path)"
            @click="toggleNav"
          >
            {{ t(`navigation.${item.key}`) }}
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
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: rem(56);
  padding: 0 rem(16);
  background-color: var(--a-bg-primary);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 2px solid var(--a-border-medium);
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08);

  @include tablet {
    padding: 0 rem(24);
    min-height: rem(64);
  }

  @include desktop {
    padding: 0 rem(32);
  }

  &.mobile {
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: rem(50);
    padding-top: rem(12);
    padding-bottom: rem(12);
    padding-left: rem(6);
    padding-right: rem(6);
    background-color: transparent;
    border-radius: var(--a-borderR--x6);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    &:hover {
      opacity: 0.8;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    @include tablet {
      max-width: rem(60);
      padding-top: rem(14);
      padding-bottom: rem(14);
      padding-left: rem(8);
      padding-right: rem(8);
    }

    @include desktop {
      max-width: rem(70);
      padding-top: rem(16);
      padding-bottom: rem(16);
      padding-left: rem(10);
      padding-right: rem(10);
    }
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
    flex: 1;
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
    margin-left: auto;
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

