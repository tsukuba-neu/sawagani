<template>
  <dialog ref="dialog">
    <div ref="dragArea" class="drag-area" :class="{ 'is-active': isDragging }">
      ファイルをドラッグ または
      <input
        type="file"
        @change="loadFiles(($event.target as HTMLInputElement).files)"
      />
    </div>
    <button @click="emit('onClose')">閉じる</button>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, useTemplateRef } from 'vue'
import { useDataStore } from '../store/data'
import { importDataToStore } from '../lib/importer'

const { isOpen } = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  onClose: []
}>()

const dialog = useTemplateRef('dialog')

watchEffect(() => {
  if (isOpen) {
    dialog.value?.show()
  } else {
    dialog.value?.close()
  }
})

const dataStore = useDataStore()
const isDragging = ref(false)

const loadFiles = (files: FileList) => {
  if (files?.length > 0) {
    const file = files[0]
    importDataToStore(file, dataStore)
  }
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false

  const files = e.dataTransfer?.files
  loadFiles(files)
}

const onDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

const dragArea = useTemplateRef('dragArea')
onMounted(() => {
  dragArea.value.addEventListener('dragover', onDragOver)
  dragArea.value.addEventListener('drop', onDrop)
  dragArea.value.addEventListener('dragleave', onDragLeave)
})

onUnmounted(() => {
  dragArea.value.removeEventListener('dragover', onDragOver)
  dragArea.value.removeEventListener('drop', onDrop)
  dragArea.value.removeEventListener('dragleave', onDragLeave)
})
</script>

<style scoped>
.drag-area {
  height: 200px;
  background-color: #ccc;
  transition: background-color 0.3s;

  &.is-active {
    background-color: rgba(0, 127, 255, 0.5);
  }
}

dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: calc(100vw - 40px * 2);
  max-width: 600px;
  margin: auto;
  z-index: 100;
}
</style>
