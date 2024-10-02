<template>
  <div class="table-column table-column--purpose">
    <div class="table-header">
      <div class="default-column border centered">内容</div>
      <div
        v-for="column in props.additionalColumns"
        :key="column"
        class="additional-column border centered"
      >
        {{ column }}
      </div>
    </div>
    <div class="table-body">
      <div class="default-column border centered"></div>
      <div
        v-for="column in props.additionalColumns"
        :key="column"
        class="additional-column border centered"
      ></div>
    </div>
    <div v-if="props.footer" class="table-footer border centered">
      {{ props.footer }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  footer?: string | null
  additionalColumns?: string[]
}>()
</script>

<style>
.table-column--purpose {
  flex: 1 1 auto;
}
</style>

<style scoped>
.table-header,
.table-body {
  display: flex;
}

.default-column {
  flex: 1 1 auto;
}

.additional-column {
  flex: 0 0 40pt;
}
</style>
