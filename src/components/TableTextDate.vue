<script setup lang="ts">
import { computed } from 'vue'
import NumSplitText from './NumSplitText.vue'

const props = defineProps<{
  value: number | string
}>()

const value = computed(() => ('0000' + props.value.toString()).slice(-4))
</script>

<template>
  <div class="table-cell table-column--date">
    <NumSplitText>
      {{ value }}
    </NumSplitText>
  </div>
</template>
