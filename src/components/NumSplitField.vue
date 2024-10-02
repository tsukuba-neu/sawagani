<template>
  <div class="num-split-field">
    <NumSplit :n="9" />
    <NumSplitText>
      <slot />
    </NumSplitText>
  </div>
</template>

<script setup lang="ts">
import NumSplitText from './NumSplitText.vue'
import NumSplit from './NumSplit.vue'
</script>

<style scoped>
.num-split-field {
  position: relative;
  width: 100%;
  height: 100%;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
