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
  <section :class="[$style.portfolio, 'layout__wrapper']" v-if="workList.length > 0">
    <ul :class="$style.portfolioList" role="list">
      <li
        :class="$style.portfolioItem"
        v-for="(item, index) in workList"
        :key="`portfolio-${index}`"
      >
        <AButton
          v-if="item.imgMob"
          @handleClick="switchShow(index)"
          :class="$style.portfolioMobView"
          onlyIcon="rounded"
          bgColor="ghost"
          :aria-label="
            toggleView(index)
              ? 'Показать десктопную версию'
              : 'Показать мобильную версию'
          "
        >
          <Mobile v-if="!toggleView(index)" />
          <Desktop v-if="toggleView(index)" />
        </AButton>
        <AButton
          v-if="item.name"
          @handleClick="switchDescription(index)"
          :class="$style.portfolioItemInfoToggle"
          onlyIcon="rounded"
          bgColor="ghost"
          :aria-label="
            toggleDescription(index)
              ? 'Скрыть описание'
              : 'Показать описание'
          "
          :aria-expanded="toggleDescription(index)"
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
              linkText="посмотреть"
              type="btn"
              bgColor="primary"
              fontSize="s"
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
}

.portfolioList {
  display: grid;
  grid-template-columns: 1fr;
  gap: rem(32);
  width: 100%;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }
}

.portfolioItem {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--a-border-light);
  border-radius: var(--a-borderR--card);
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--a-border-medium);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
}

.portfolioMobView,
.portfolioItemInfoToggle {
  position: absolute;
  top: rem(12);
  z-index: 2;
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
  background-color: var(--a-bg-secondary);
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
  padding: rem(20);
  background-color: var(--a-bg-primary);
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

