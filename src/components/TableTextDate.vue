<script setup lang="ts">
import { computed } from 'vue'
import NumSplitText from './NumSplitText.vue'

const props = defineProps<{
  value: number | string
}>()

const value = computed(() => {
  switch (typeof props.value) {
    case 'number':
      return ('0000' + props.value.toString()).slice(-4)
    case 'string': {
      const yyyymmddMatch = props.value.match(
        /(\d{4})[/-](\d{1,2})[/-](\d{1,2})/,
      )
      if (yyyymmddMatch) {
        return (
          yyyymmddMatch[2].padStart(2, '0') + yyyymmddMatch[3].padStart(2, '0')
        )
      } else {
        return ('0000' + props.value).slice(-4)
      }
    }
    default:
      return ('0000' + props.value).slice(-4)
  }
})
</script>

<template>
  <div class="table-cell table-column--date">
    <NumSplitText>
      {{ value }}
    </NumSplitText>
  </div>
</template>
