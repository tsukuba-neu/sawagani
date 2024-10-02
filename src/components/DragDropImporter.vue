<template>
  <div class="drag-overlay" :class="{ 'is-active': isDragging }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '../store/data'
import { storeToRefs } from 'pinia'
import { parse as parseCSV } from 'papaparse'

const dataStore = useDataStore()
const { book } = storeToRefs(dataStore)

const isDragging = ref(false)

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false

  const files = e.dataTransfer?.files
  if (files?.length > 0) {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      const text = e.target?.result as string
      const { data } = parseCSV<string[]>(text)
      book.value = data
    })
    reader.readAsText(files[0])
  }
}

const onDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

onMounted(() => {
  document.addEventListener('dragover', onDragOver)
  document.addEventListener('drop', onDrop)
  document.addEventListener('dragleave', onDragLeave)
})

onUnmounted(() => {
  document.removeEventListener('dragover', onDragOver)
  document.removeEventListener('drop', onDrop)
  document.removeEventListener('dragleave', onDragLeave)
})
</script>

<style scoped>
.drag-overlay {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 127, 255, 0.5);
  opacity: 0;
  transition: opacity 0.3s;

  &.is-active {
    opacity: 1;
  }
}
</style>
