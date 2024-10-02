<template>
  <div class="num-split-text">
    <span class="spacer"></span>
    <span class="value"><slot /></span>
  </div>
</template>

<style scoped>
.num-split-text {
  font: normal 16px var(--font-family-number);
  text-align: right;
  width: 100%;
  height: 100%;
  letter-spacing: 1.6pt;
  line-height: 1em;
  mix-blend-mode: multiply;
  padding: 0;
}

.num-split-text {
  .value {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}

:global(.num-split-field > .num-split-text) {
  display: grid;
  grid-template-columns: 1fr auto; /* 数字を右詰めで表示する */

  .value {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }
}
</style>
