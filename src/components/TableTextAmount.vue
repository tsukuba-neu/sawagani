<script setup lang="ts">
import { computed } from 'vue'
import NumSplitText from './NumSplitText.vue'

const props = defineProps<{
  value: number
}>()

const value = computed(() => {
  return '¥' + props.value.toString()
})
</script>

<template>
  <div class="table-cell table-column--amount">
    <NumSplitText>
      {{ value }}
    </NumSplitText>
  </div>
</template>
