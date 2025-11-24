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
    <h1 :class="[$style.title, 'a-font__h1', 'hidden']">Инструменты</h1>
    <div :class="$style.header">
      <li :class="[$style.headerTitle, 'a-font__s']">
        {{ $t("tools.technologies") }}
      </li>
      <ul :class="$style.headerList">
        <li
          :class="[$style.headerItem, item.cell]"
          v-for="(item, index) in titleList"
          :key="index"
          v-if="titleList"
        >
          <div :class="$style.headerImgWrapper">
            <Icon :name="item.icon" filled />
          </div>
          <div :class="$style.headerLinkGroup">
            <a
              :href="`${item.href}`"
              :class="[$style.headerSourse, 'a-font__s']"
              target="_blank"
              >{{ item.title }}</a
            >
            <a :href="`#${item.id}`" :class="[$style.headerLink, 'a-font__s']" title="nav">#</a>
          </div>
        </li>
      </ul>
    </div>
    <section :class="$style.content">
      <div
        :class="$style.section"
        :id="item.id"
        v-for="(item, index) in toolsDescription"
        :key="index"
      >
        <div :class="$style.logoWrapper">
          <Icon :name="item.icon" filled />
        </div>
        <h2 :class="[$style.subtitle, 'a-font__h3']">{{ item.name }}</h2>
        <div :class="$style.sectionPluginBlock" v-if="item.plugIn.length">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">Plug-in's</h4>
          <ul :class="$style.sectionListPlugin">
            <li
              :class="$style.sectionItemPlugin"
              v-for="(plugin, pluginIndex) in item.plugIn"
              :key="pluginIndex"
            >
              {{ (plugin as { name: string })?.name }}
            </li>
          </ul>
        </div>
        <div :class="$style.sectionPluginBlock" v-if="item.links.length">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">
            {{ $t("tools.links") }}
          </h4>
          <ul :class="$style.sectionListPlugin">
            <li
              :class="$style.sectionItemPlugin"
              v-for="(link, linkIndex) in item.links"
              :key="linkIndex"
            >
              <ALink
                :href="link.href"
                :linkText="link.text"
                type="btn"
                bgColor="secondary"
                fontSize="s"
              />
            </li>
          </ul>
        </div>
        <div :class="$style.sectionPluginBlock" v-if="item.npm">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">
            {{ $t("tools.dependencies") }}
          </h4>
          <ul :class="$style.sectionListPlugin">
            <li :class="$style.sectionItemPlugin" v-for="(link, npmIndex) in item.npm" :key="npmIndex">
              <ALink
                :href="link.href"
                :linkText="link.text"
                type="btn"
                bgColor="primary"
                fontSize="s"
              />
            </li>
          </ul>
        </div>
        <div :class="$style.sectionPluginBlock" v-if="item.modules">
          <h4 :class="[$style.sectionHeader, 'a-font__h4']">
            {{ $t("tools.modules") }}
          </h4>
          <ul :class="$style.sectionListPlugin">
            <li :class="$style.sectionItemPlugin" v-for="(link, moduleIndex) in item.modules" :key="moduleIndex">
              <ALink
                :href="link.href"
                :linkText="link.text"
                type="btn"
                bgColor="primary"
                fontSize="s"
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

.title {
  margin-bottom: rem(32);
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
  display: flex;
  align-items: center;
  gap: rem(12);
  padding: rem(12);
  border: 1px solid var(--a-border-light);
  border-radius: var(--a-borderR--x6);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--a-border-medium);
    background-color: var(--a-bg-secondary);
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
}

.logoWrapper {
  display: flex;
  align-items: center;
  width: rem(60);
  height: rem(60);
  margin-bottom: rem(16);
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

