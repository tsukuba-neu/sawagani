<template>
  <button @click="onClick">
    <slot v-if="state === 'ready'"></slot>
    <slot v-else-if="state === 'loading'" name="loading"></slot>
    <slot v-else-if="state === 'completed'" name="completed"></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const state = ref<'ready' | 'loading' | 'completed'>('ready')
const lastCompleted = ref(0)

const props = defineProps<{
  onClick: () => unknown | Promise<unknown>
  time?: number
}>()

const onClick = async () => {
  await props.onClick()
  const t = Date.now()
  lastCompleted.value = t
  state.value = 'completed'
  setTimeout(() => {
    if (lastCompleted.value === t) {
      state.value = 'ready'
    }
  }, props.time ?? 3000)
}
</script>
