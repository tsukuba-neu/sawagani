<template>
  <div class="control-ui">
    <img :src="IconSVG" width="50" height="30" alt="" class="icon" />
    <ButtonWithState :on-click="importFromClipboard" :time="1000">
      <template #default> クリップボードからインポート </template>
      <template #loading>クリップボードを読み取り中……</template>
      <template #completed>クリップボードからインポートしました</template>
    </ButtonWithState>
    <button @click="importFromFile">ファイルからインポート</button>
    <button
      @click="
        confirm('リセットすると入力中のすべてのデータが破棄されます。') &&
          dataStore.reset()
      "
    >
      リセット
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store/data'
import ButtonWithState from './ButtonWithState.vue'
import IconSVG from '/icon.svg?url'

const confirm = (...args) => window.confirm(...args)

const dataStore = useDataStore()
const { book } = storeToRefs(dataStore)

const importFromClipboard = async () => {
  const text = await navigator.clipboard.readText()
  const b = text
    .split('\n')
    .filter((line) => line.length > 0 && line.match(/\S/))
    .map((line) => line.split('\t'))
  book.value = b
}

const importFromFile = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = (e.target?.result as string) || ''
    try {
      dataStore.importCSVString(text)
    } catch (error) {
      alert('ファイルを正しく読み取ることができませんでした。正しいファイルが選択されているか確認してください。');
      console.error('Error importing CSV:', error)
    }
  }
  reader.readAsText(file)
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
