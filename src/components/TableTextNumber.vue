<template>
  <div class="table-cell table-text table-column--number">
    {{ props.value }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number | string
}>()
</script>

<style scoped>
.table-text {
  text-align: right;
}
</style>
