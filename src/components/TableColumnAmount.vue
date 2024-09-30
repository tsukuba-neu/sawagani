<template>
  <div class="table-column table-column--amount">
    <div class="table-header amount border centered">金額</div>
    <div class="table-body">
      <NumSplit :n="9" />
    </div>
    <div v-if="!props.noFooter" class="table-footer">
      <NumSplit :n="9" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NumSplit from './NumSplit.vue'
const props = defineProps<{
  noFooter?: boolean
}>()
</script>

<style>
.table-column--amount {
  flex: 0 0 calc(var(--num-place-width) * 9);
}
</style>
