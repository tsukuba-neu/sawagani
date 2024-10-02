<template>
  <div class="col2">
    <slot />
  </div>
</template>
<style scoped>
.col2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  & > *:nth-child(2) {
    transform: translateX(calc(var(--border-width) * -1));
  }
}
</style>
