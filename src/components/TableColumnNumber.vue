<template>
  <div class="table-column table-column--number">
    <div class="table-header border centered">No</div>
    <div class="table-body border"></div>
    <div v-if="!props.noFooter" class="table-footer border"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  noFooter?: boolean
}>()
</script>

<style>
.table-column--number {
  flex: 0 0 30px;
}
</style>
