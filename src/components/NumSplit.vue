<template>
  <div class="num-split">
    <div v-for="_ in props.n" class="border place"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  n: number
}>()
</script>

<style scoped>
.num-split {
  display: flex;
  height: 100%;

  .place {
    flex: 0 0 var(--num-place-width);
  }
}
</style>
