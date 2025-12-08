<script setup lang="ts">
import type { typeToolsTitle } from "~/types/tools/typeToolsTitle";
import { toolsTitleList } from "~/composables/tools/toolsTitleList";
import { toolsData } from "~/composables/tools/toolsData";

definePageMeta({
  title: "tools",
  layout: "default",
});

const titleList = ref<Array<typeToolsTitle>>([]);

const { toolsTitle } = toolsTitleList();
titleList.value = toolsTitle;

const { toolsDescription } = toolsData();
</script>

<template>
  <section :class="[$style.tools, 'layout__wrapper']">
    <div :class="$style.pageHeader">
      <h1 :class="[$style.pageTitle, 'a-font__h1']">Инструменты</h1>
      <p :class="[$style.pageDescription, 'a-font__m']">
        Технологии, инструменты и библиотеки, которые я использую в разработке
      </p>
    </div>
    <div :class="$style.header">
      <div :class="[$style.headerTitle, 'a-font__s']">
        {{ $t("tools.technologies") }}
      </div>
      <ul :class="$style.headerList">
        <li
          v-for="(item, index) in titleList"
          :key="index"
          :class="[$style.headerItem, item.cell]"
        >
          <div :class="$style.headerImgWrapper">
            <Icon :name="item.icon" filled />
          </div>
          <div :class="$style.headerLinkGroup">
            <a
              :href="`${item.href}`"
              :class="[$style.headerSourse, 'a-font__s']"
              target="_blank"
            >{{ item.title }}</a>
            <a :href="`#${item.id}`" :class="[$style.headerLink, 'a-font__s']" title="nav">#</a>
          </div>
        </li>
      </ul>
    </div>
    <section :class="$style.content">
      <div
        v-for="(item, index) in toolsDescription"
        :id="item.id"
        :key="index"
        :class="$style.section"
      >
        <div :class="$style.logoWrapper">
          <Icon :name="item.icon" filled />
        </div>
        <h2 :class="[$style.subtitle, 'a-font__h3']">{{ item.name }}</h2>
        <div v-if="item.plugIn.length" :class="$style.sectionPluginBlock">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">Plug-in's</h4>
          <ul :class="$style.sectionListPlugin">
            <li
              v-for="(plugin, pluginIndex) in item.plugIn"
              :key="pluginIndex"
              :class="$style.sectionItemPlugin"
            >
              {{ (plugin as { name: string })?.name }}
            </li>
          </ul>
        </div>
        <div v-if="item.links.length" :class="$style.sectionPluginBlock">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">
            {{ $t("tools.links") }}
          </h4>
          <ul :class="$style.sectionListPlugin">
            <li
              v-for="(link, linkIndex) in item.links"
              :key="linkIndex"
              :class="$style.sectionItemPlugin"
            >
              <ALink
                :href="link.href"
                :link-text="link.text"
                type="btn"
                bg-color="secondary"
                font-size="s"
              />
            </li>
          </ul>
        </div>
        <div v-if="item.npm" :class="$style.sectionPluginBlock">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">
            {{ $t("tools.dependencies") }}
          </h4>
          <ul :class="$style.sectionListPlugin">
            <li v-for="(link, npmIndex) in item.npm" :key="npmIndex" :class="$style.sectionItemPlugin">
              <ALink
                :href="link.href"
                :link-text="link.text"
                type="btn"
                bg-color="primary"
                font-size="s"
              />
            </li>
          </ul>
        </div>
        <div v-if="item.modules" :class="$style.sectionPluginBlock">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">
            {{ $t("tools.modules") }}
          </h4>
          <ul :class="$style.sectionListPlugin">
            <li v-for="(link, moduleIndex) in item.modules" :key="moduleIndex" :class="$style.sectionItemPlugin">
              <ALink
                :href="link.href"
                :link-text="link.text"
                type="btn"
                bg-color="primary"
                font-size="s"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </section>
</template>

<style module lang="scss">
.tools {
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

.header {
  margin-bottom: rem(48);
  padding-bottom: rem(24);
  border-bottom: 1px solid var(--a-border-light);
}

.headerTitle {
  margin-bottom: rem(16);
  color: var(--a-text-secondary);
  text-transform: uppercase;
}

.headerList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: rem(16);
}

.headerItem {
  position: relative;
  display: flex;
  align-items: center;
  gap: rem(12);
  padding: rem(12);
  border: 1px solid var(--a-border-medium);
  border-radius: var(--a-borderR--x6);
  background-color: var(--a-bg-secondary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--a-color-blue);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  // Цветовые акценты для разных элементов
  &:nth-child(6n + 1)::before {
    background: var(--a-color-blue);
  }

  &:nth-child(6n + 2)::before {
    background: var(--a-color-green);
  }

  &:nth-child(6n + 3)::before {
    background: var(--a-color-purple);
  }

  &:nth-child(6n + 4)::before {
    background: var(--a-color-orange);
  }

  &:nth-child(6n + 5)::before {
    background: var(--a-color-teal);
  }

  &:nth-child(6n + 6)::before {
    background: var(--a-color-pink);
  }

  &:hover {
    border-color: var(--a-border-dark);
    background-color: var(--a-bg-accent);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }
}

.headerImgWrapper {
  display: flex;
  align-items: center;
  width: rem(40);
  height: rem(40);
}

.headerLinkGroup {
  display: flex;
  flex-direction: column;
  gap: rem(4);
}

.headerSourse {
  color: var(--a-text-primary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--a-link-hover);
  }
}

.headerLink {
  color: var(--a-text-secondary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--a-text-primary);
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: rem(48);
}


.section {
  padding-bottom: rem(32);
  border-bottom: 1px solid var(--a-border-light);

  &:last-child {
    border-bottom: none;
  }

  // Цветовые акценты для разных секций
  &:nth-child(6n + 1) .logoWrapper {
    background: var(--a-color-blue-bg);
  }

  &:nth-child(6n + 2) .logoWrapper {
    background: var(--a-color-green-bg);
  }

  &:nth-child(6n + 3) .logoWrapper {
    background: var(--a-color-purple-bg);
  }

  &:nth-child(6n + 4) .logoWrapper {
    background: var(--a-color-orange-bg);
  }

  &:nth-child(6n + 5) .logoWrapper {
    background: var(--a-color-teal-bg);
  }

  &:nth-child(6n + 6) .logoWrapper {
    background: var(--a-color-pink-bg);
  }

  &:hover .logoWrapper {
    transform: scale(1.05);

    :global(.nuxt-icon) {
      transform: rotate(5deg);
    }
  }
}

.logoWrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: rem(60);
  height: rem(60);
  margin-bottom: rem(16);
  padding: rem(8);
  border-radius: var(--a-borderR--x6);
  background: var(--a-color-blue-bg);
  transition: all 0.3s ease;

  :global(.nuxt-icon) {
    transition: transform 0.3s ease;
  }
}

.subtitle {
  margin-bottom: rem(24);
  color: var(--a-text-primary);
}

.sectionPluginBlock {
  margin-bottom: rem(24);

  &:last-child {
    margin-bottom: 0;
  }
}

.sectionHeader {
  margin-bottom: rem(12);
  color: var(--a-text-primary);
}

.sectionListPlugin {
  display: flex;
  flex-wrap: wrap;
  gap: rem(8);
}

.sectionItemPlugin {
  color: var(--a-text-secondary);
}
</style>

