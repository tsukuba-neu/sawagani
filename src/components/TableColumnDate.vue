<template>
  <div class="table-column table-column--date">
    <div class="table-header amount border centered">日付</div>
    <div class="table-body">
      <NumSplit :n="4" />
    </div>
    <div v-if="!props.noFooter" class="table-footer border"></div>
  </div>
</template>

<script setup lang="ts">
import NumSplit from './NumSplit.vue'
const props = defineProps<{
  noFooter?: boolean
}>()
</script>

<style>
.table-column--date {
  flex: 0 0 calc(var(--num-place-width) * 4);

  /* 隣の列がNoである場合はフッターをつなげる */
  &:has(+ .table-column--number) {
    .table-footer {
      border-right: none;
    }
  }
}
</style>
