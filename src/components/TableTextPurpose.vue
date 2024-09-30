<template>
  <div class="table-cell table-column--purpose">
    <div class="table-text default-column">
      {{ props.value }}
    </div>
    <div
      v-for="v in props.additionalColumns"
      class="table-text additional-column"
    >
      {{ v }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: string
  additionalColumns?: string[]
}>()
</script>

<style scoped>
.table-cell {
  display: flex;
}

.default-column {
  flex: 1 1 auto;
}

.additional-column {
  flex: 0 0 40pt;
}
</style>
