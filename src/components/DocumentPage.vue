<template>
  <section>
    <slot />
  </section>
</template>

<style scoped>
section {
  width: calc(210mm);
  height: calc(297mm - 1mm);
  padding: var(--page-margin);
  box-sizing: border-box;
  border: 0.1px solid transparent;
  break-inside: avoid;
  break-after: page;
}

/* スクリーンで表示するときは個別に余白を設定する */
@media screen {
  section {
    margin: 30px;
  }
}
</style>
