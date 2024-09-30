<template>
  <div class="num-split-text">
    <slot />
  </div>
</template>

<style scoped>
.num-split-text,
.num-split-text > :deep(.editable-field) {
  font: normal 16px var(--font-family-number);
  text-align: right;
  width: 100%;
  height: 100%;
  letter-spacing: 2pt;
  line-height: 1em;
  mix-blend-mode: multiply;
  padding: 0;
}
</style>
