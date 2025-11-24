<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: "#",
  },
  linkText: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: undefined,
    validator: (value: string) => ["btn"].includes(value),
  },
  target: {
    type: String,
    default: "_blank",
  },
  rel: {
    type: String,
    default: "",
  },
  bgColor: {
    type: String,
    default: undefined,
    validator: (value: string) =>
      ["accent", "primary", "secondary", "ghost"].includes(value),
  },
  fontSize: {
    type: String,
    default: undefined,
    validator: (value: string) => ["s", "xs"].includes(value),
  },
});

const classes = computed(() => {
  return {
    "a-link": true,
    [`a-link--${props.type}`]: props.type,
    [`a-link--${props.bgColor}`]: props.bgColor,
  };
});

const fontsize = computed(() => {
  return {
    [`a-font__${props.fontSize}`]: props.fontSize,
  };
});
</script>

<template>
  <a
    :href="href"
    :class="[classes, fontsize]"
    :target="target"
    :rel="rel || (target === '_blank' ? 'noopener noreferrer' : undefined)"
  >
    {{ linkText }}
    <slot></slot>
  </a>
</template>

<style scoped lang="scss">
.a-link {
  display: inline-flex;
  align-items: center;
  color: var(--a-link);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--a-link-hover);
  }

  &--btn {
    padding: rem(8) rem(16);
    border-radius: var(--a-borderR--btn);
    transition: all 0.2s ease;
  }

  &--accent {
    color: var(--a-bg-primary);
    background-color: var(--a-accent-primary);

    &:hover {
      background-color: var(--a-accent-hover);
    }
  }

  &--primary {
    color: var(--a-text-primary);
    background-color: var(--a-bg-secondary);
    border: 1px solid var(--a-border-medium);

    &:hover {
      background-color: var(--a-bg-accent);
      border-color: var(--a-border-dark);
    }
  }

  &--secondary {
    color: var(--a-text-primary);
    background-color: transparent;
    border: 1px solid var(--a-border-medium);

    &:hover {
      background-color: var(--a-bg-secondary);
    }
  }

  &--ghost {
    color: var(--a-text-secondary);
    background-color: transparent;

    &:hover {
      color: var(--a-text-primary);
      background-color: var(--a-bg-secondary);
    }
  }
}
</style>

