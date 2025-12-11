<template>
  <div class="control-ui">
    <a :href="packageJson.homepage" target="_blank" rel="noopener noreferrer">
      <img :src="IconSVG" width="50" height="30" alt="" class="icon" />
    </a>
    <ButtonWithState :on-click="importFromClipboard" :time="1000">
      <template #default> クリップボードからインポート </template>
      <template #loading>クリップボードを読み取り中……</template>
      <template #completed>クリップボードからインポートしました</template>
    </ButtonWithState>
    <button @click="isImporterOpen = true">ファイルからインポート</button>
    <button
      @click="
        confirm('リセットすると入力中のすべてのデータが破棄されます。') &&
        dataStore.reset()
      "
    >
      リセット
    </button>
  </div>
  <ImporterDialog
    :is-open="isImporterOpen"
    @on-close="isImporterOpen = false"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { parse as parseCSV } from 'papaparse'
import { useDataStore } from '../store/data'
import ButtonWithState from './ButtonWithState.vue'
import IconSVG from '/icon.svg?url'
import ImporterDialog from './ImporterDialog.vue'
import { ref } from 'vue'
import packageJson from '../../package.json'
import { removeTrailingEmptyRows } from '../lib/array'

const confirm = (...args: Parameters<typeof window.confirm>) =>
  window.confirm(...args)

const isImporterOpen = ref(false)

const dataStore = useDataStore()
const { book } = storeToRefs(dataStore)

const importFromClipboard = async () => {
  const text = await navigator.clipboard.readText()
  const { data } = parseCSV<string[]>(text)
  book.value = removeTrailingEmptyRows(data)
}
</script>

<style scoped>
.control-ui {
  background-color: #eee;
  height: 45px;
  padding: 10px;
  display: flex;
  gap: 10px;
}

.icon:hover {
  animation: sawagani 0.3s ease-in-out 0s alternate infinite;
}

@keyframes sawagani {
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}

@media print {
  .control-ui {
    display: none;
  }
}
</style>
