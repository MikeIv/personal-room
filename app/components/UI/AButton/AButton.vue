<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    default: undefined,
    validator: (value: string) =>
      ["accent", "primary", "secondary", "ghost"].includes(value),
  },
  label: {
    type: String,
    default: "",
  },
  onlyIcon: {
    type: String,
    default: undefined,
    validator: (value: string) => ["rounded", "square"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: (value: string) =>
      ["xlarge", "large", "medium", "small"].includes(value),
    default: "medium",
  },
});

const emit = defineEmits(["handleClick"]);

const handleClick = () => {
  emit("handleClick");
};

const classes = computed(() => {
  return {
    "a-button": true,
    [`a-button--${props.size}`]: true,
    [`a-button--${props.bgColor}`]: props.bgColor,
    [`a-button--${props.onlyIcon}`]: props.onlyIcon,
  };
});
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    @click.prevent.stop="handleClick"
  >
    <slot></slot>
    <span v-if="label" class="a-button__label">{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.a-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-weight: var(--font-weight-medium);

  &__label {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  // Size
  &--small {
    height: rem(32);
    padding: 0 rem(16);
    font-size: var(--font-size-sm);
    border-radius: var(--a-borderR--x6);
  }

  &--medium {
    height: rem(40);
    padding: 0 rem(24);
    font-size: var(--font-size-base);
    border-radius: var(--a-borderR--btn);
  }

  &--large {
    height: rem(48);
    padding: 0 rem(32);
    font-size: var(--font-size-lg);
    border-radius: var(--a-borderR--btn);
  }

  &--xlarge {
    height: rem(56);
    padding: 0 rem(40);
    font-size: var(--font-size-xl);
    border-radius: var(--a-borderR--btn);
  }

  // OnlyIcon
  &--rounded {
    width: rem(40);
    height: rem(40);
    padding: 0;
    border-radius: 50%;

    .a-button__label {
      display: none;
    }
  }

  &--square {
    width: rem(40);
    height: rem(40);
    padding: 0;

    .a-button__label {
      display: none;
    }
  }

  // Colors
  &--accent {
    color: var(--a-bg-primary);
    background-color: var(--a-accent-primary);

    &:hover:not(:disabled) {
      background-color: var(--a-accent-hover);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  }

  &--primary {
    color: var(--a-text-primary);
    background-color: var(--a-bg-secondary);
    border: 1px solid var(--a-border-medium);

    &:hover:not(:disabled) {
      background-color: var(--a-bg-accent);
      border-color: var(--a-border-dark);
    }
  }

  &--secondary {
    color: var(--a-text-primary);
    background-color: transparent;
    border: 1px solid var(--a-border-medium);

    &:hover:not(:disabled) {
      background-color: var(--a-bg-secondary);
    }
  }

  &--ghost {
    color: var(--a-text-secondary);
    background-color: transparent;

    &:hover:not(:disabled) {
      color: var(--a-text-primary);
      background-color: var(--a-bg-secondary);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>

