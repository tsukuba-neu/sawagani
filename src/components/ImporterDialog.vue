<template>
  <dialog ref="dialog">
    <div class="container">
      <div
        v-if="state === 'idle'"
        ref="dragArea"
        class="drag-area"
        :class="{ 'is-active': isDragging }"
      >
        <div class="eyecatch">
          ファイルをドロップ または
          <input type="button" value="選択" @click="fileInput?.click()" />
          <input
            ref="fileInput"
            type="file"
            style="display: none"
            @change="loadFiles(($event.target as HTMLInputElement).files)"
          />
        </div>
        <p>
          帳簿テンプレートを用いたCSVファイル、sawaganiから出力されたPDFファイルがインポートできます。
        </p>
      </div>
      <div v-else-if="state === 'loading'" class="loading">
        <div>読み込み中...</div>
        <progress indeterminate></progress>
      </div>
      <div v-else-if="state === 'error'">
        <h2>❌️ ファイルを読み込むことができませんでした。</h2>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
        <p>ヒント：</p>
        <ul>
          <li>
            ここでは以下のいずれかのデータを読み込むことができます。

            <ul>
              <li>帳簿テンプレートを用いたCSVファイル</li>
              <li>
                sawaganiから出力されたPDFファイル
                <ul>
                  <li>
                    sawaganiは、PDFファイルの中にあるQRコードを読み取っています。通常は、一番最後のページに印字されています。
                  </li>
                  <li>
                    QRコードが読み取れる状態であるか確認してください。滲んだり、潰れたりしていると読み取れない場合があります。
                  </li>
                  <li>
                    帳簿の内容が多いとQRコードの数も増えます。すべてのQRコードが印字されていることを確認してください。
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="actions">
        <button @click="emit('onClose')">閉じる</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  watchEffect,
  useTemplateRef,
  onBeforeUnmount,
} from 'vue'
import { useDataStore } from '../store/data'
import { importDataToStore } from '../lib/importer'

const { isOpen } = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  onClose: []
}>()

const dialog = useTemplateRef('dialog')
const fileInput = useTemplateRef('fileInput')

const state = ref<'idle' | 'loading' | 'error'>('idle')
const errors = ref<string[]>([])

watchEffect(() => {
  if (isOpen) {
    dialog.value?.showModal()
  } else {
    state.value = 'idle'
    errors.value = []
    dialog.value?.close()
  }
})

const dataStore = useDataStore()
const isDragging = ref(false)

const loadFiles = async (files: FileList) => {
  state.value = 'loading'
  errors.value = []
  try {
    if (files?.length > 0) {
      const file = files[0]
      await importDataToStore(file, dataStore)
    }

    if (fileInput.value) {
      fileInput.value.value = ''
    }
    state.value = 'idle'
    dialog.value?.close()
    emit('onClose')
  } catch (e) {
    state.value = 'error'
    console.error(e)
    errors.value.push((e as Error).message)
  }
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDrop = async (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false

  const files = e.dataTransfer?.files
  await loadFiles(files)
}

const onDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

const dragArea = useTemplateRef('dragArea')
onMounted(() => {
  if (dragArea.value) {
    dragArea.value.addEventListener('dragover', onDragOver)
    dragArea.value.addEventListener('drop', onDrop)
    dragArea.value.addEventListener('dragleave', onDragLeave)
  }
})

onBeforeUnmount(() => {
  dialog.value?.close()
  if (dragArea.value) {
    dragArea.value.removeEventListener('dragover', onDragOver)
    dragArea.value.removeEventListener('drop', onDrop)
    dragArea.value.removeEventListener('dragleave', onDragLeave)
  }
})
</script>

<style scoped>
.drag-area {
  background-color: #ccc;
  transition: background-color 0.3s;
  text-align: center;
  line-height: 1.4em;
  padding: 2rem 4rem;

  &.is-active {
    background-color: rgba(0, 127, 255, 0.5);
  }

  .eyecatch {
    font-size: 1.2rem;

    input[type='button'] {
      font-size: 1rem;
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  }
}

.loading {
  text-align: center;
  margin: 2rem 0;
}

.actions {
  text-align: right;
  margin-top: 1rem;
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
  font-family: sans-serif;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .container {
    display: grid;
    grid-template-rows: minmax(200px, auto) auto;
  }
}
</style>
