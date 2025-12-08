<script setup lang="ts">
definePageMeta({
  title: "Портфолио",
  layout: "default",
});

const { locale } = useI18n();

// Загружаем данные портфолио напрямую из JSON файлов
const ruDataModule = await import("../locales/ru.json");
const enDataModule = await import("../locales/en.json");

const ruData = ruDataModule.default?.portfolio || [];
const enData = enDataModule.default?.portfolio || [];

// Computed для списка работ с реактивностью на изменение локали
const workList = computed(() => {
  const data = locale.value === "ru" ? ruData : enData;
  return Array.isArray(data) ? data : [];
});

// Состояние для переключения вида и описания
const showMobile = ref<Record<number, boolean>>({});
const showDescription = ref<Record<number, boolean>>({});

// Функции переключения
const switchShow = (index: number) => {
  showMobile.value[index] = !showMobile.value[index];
};

const switchDescription = (index: number) => {
  showDescription.value[index] = !showDescription.value[index];
};

// Функции проверки состояния
const toggleView = (index: number): boolean => {
  return showMobile.value[index] ?? false;
};

const toggleDescription = (index: number): boolean => {
  return showDescription.value[index] ?? false;
};

// Функция для формирования пути к изображению
const getImagePath = (filename: string): string => {
  return filename ? `/images/portfolio/${filename}` : "";
};
</script>

<template>
  <section v-if="workList.length > 0" :class="[$style.portfolio, 'layout__wrapper']">
    <div :class="$style.pageHeader">
      <h1 :class="[$style.pageTitle, 'a-font__h1']">Портфолио</h1>
      <p :class="[$style.pageDescription, 'a-font__m']">
        Примеры моих работ и проектов
      </p>
    </div>
    <ul :class="$style.portfolioList" role="list">
      <li
        v-for="(item, index) in workList"
        :key="`portfolio-${index}`"
        :class="$style.portfolioItem"
      >
        <AButton
          v-if="item.imgMob"
          :class="$style.portfolioMobView"
          only-icon="rounded"
          bg-color="ghost"
          :aria-label="
            toggleView(index)
              ? 'Показать десктопную версию'
              : 'Показать мобильную версию'
          "
          @handle-click="switchShow(index)"
        >
          <Mobile v-if="!toggleView(index)" />
          <Desktop v-if="toggleView(index)" />
        </AButton>
        <AButton
          v-if="item.name"
          :class="$style.portfolioItemInfoToggle"
          only-icon="rounded"
          bg-color="ghost"
          :aria-label="
            toggleDescription(index)
              ? 'Скрыть описание'
              : 'Показать описание'
          "
          :aria-expanded="toggleDescription(index)"
          @handle-click="switchDescription(index)"
        >
          <Information v-if="!toggleDescription(index)" />
          <Close v-if="toggleDescription(index)" />
        </AButton>
        <figure :class="$style.portfolioImgWrapper">
          <img
            v-if="toggleView(index) && item.imgMob"
            :src="getImagePath(item.imgMob)"
            :alt="`${item.name} - мобильная версия`"
            :class="$style.portfolioImg"
            loading="lazy"
            decoding="async"
          />
          <img
            v-else-if="item.img"
            :src="getImagePath(item.img)"
            :alt="`${item.name} - десктопная версия`"
            :class="$style.portfolioImg"
            loading="lazy"
            decoding="async"
          />
          <img
            v-else-if="item.imgMob"
            :src="getImagePath(item.imgMob)"
            :alt="`${item.name} - мобильная версия`"
            :class="$style.portfolioImg"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <article
          v-if="toggleDescription(index)"
          :class="$style.portfolioDescription"
          :aria-hidden="!toggleDescription(index)"
        >
          <header :class="$style.portfolioDescriptionHead">
            <h3 :class="[$style.portfolioDescriptionTitle, 'a-font__h4']">
              {{ item.name }}
            </h3>
            <ALink
              :href="item.link"
              link-text="посмотреть"
              type="btn"
              bg-color="primary"
              font-size="s"
              :aria-label="`Открыть проект ${item.name} в новой вкладке`"
            />
          </header>
          <p :class="[$style.portfolioDescriptionText, 'a-font__m']">
            {{ item.description }}
          </p>
        </article>
      </li>
    </ul>
  </section>
</template>

<style module lang="scss">
.portfolio {
  width: 100%;
  animation: fadeIn 0.6s ease-out;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.portfolioList {
  display: grid;
  grid-template-columns: 1fr;
  gap: rem(24);
  width: 100%;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
    gap: rem(32);
  }

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
    gap: rem(40);
  }
}

.portfolioItem {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--a-border-light);
  border-radius: var(--a-borderR--card);
  overflow: hidden;
  background-color: var(--a-bg-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  // Цветовые акценты для разных карточек
  &:nth-child(3n + 1) {
    border-top: 3px solid var(--a-color-blue);

    .portfolioImgWrapper {
      background: linear-gradient(135deg, var(--a-color-blue-bg) 0%, var(--a-bg-accent) 100%);
    }
  }

  &:nth-child(3n + 2) {
    border-top: 3px solid var(--a-color-purple);

    .portfolioImgWrapper {
      background: linear-gradient(135deg, var(--a-color-purple-bg) 0%, var(--a-bg-accent) 100%);
    }
  }

  &:nth-child(3n + 3) {
    border-top: 3px solid var(--a-color-orange);

    .portfolioImgWrapper {
      background: linear-gradient(135deg, var(--a-color-orange-bg) 0%, var(--a-bg-accent) 100%);
    }
  }

  &:hover {
    border-color: var(--a-border-medium);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }

  &:nth-child(3n + 1):hover {
    box-shadow: 0 8px 24px var(--a-color-blue-bg-hover);
  }

  &:nth-child(3n + 2):hover {
    box-shadow: 0 8px 24px var(--a-color-purple-bg-hover);
  }

  &:nth-child(3n + 3):hover {
    box-shadow: 0 8px 24px var(--a-color-orange-bg-hover);
  }
}

.portfolioMobView,
.portfolioItemInfoToggle {
  position: absolute;
  top: rem(12);
  z-index: 3;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }
}

.portfolioMobView {
  right: rem(50);
}

.portfolioItemInfoToggle {
  right: rem(12);
}

.portfolioImgWrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
  background: linear-gradient(135deg, var(--a-bg-secondary) 0%, var(--a-bg-accent) 100%);
}

.portfolioImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolioDescription {
  padding: rem(24);
  background-color: var(--a-bg-primary);
  border-top: 1px solid var(--a-border-light);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.portfolioDescriptionHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: rem(12);
}

.portfolioDescriptionTitle {
  color: var(--a-text-primary);
}

.portfolioDescriptionText {
  color: var(--a-text-secondary);
  line-height: var(--line-height-relaxed);
}
</style>

