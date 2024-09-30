<template>
  <div class="table-column table-column--do-not-write">
    <div class="table-header border centered">記入しない</div>
    <div class="table-body border"></div>
    <div v-if="!props.noFooter" class="table-footer border"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  noFooter?: boolean
}>()
</script>

<style scoped>
.table-header {
  font-size: 0.9em;
}
</style>

<style>
.table-column--do-not-write {
  flex: 0 0 40px;
}
</style>
