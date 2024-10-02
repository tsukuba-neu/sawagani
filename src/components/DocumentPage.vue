<template>
  <section>
    <slot />
  </section>
</template>

<style scoped>
section {
  width: calc(210mm - 5mm * 2);
  height: calc(297mm - 5mm * 2);
  border: 0.1px solid transparent;
}

/* スクリーンで表示するときは個別に余白を設定する */
@media screen {
  section {
    margin: 30px;
  }
}
</style>
