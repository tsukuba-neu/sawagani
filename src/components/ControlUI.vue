<template>
  <div class="control-ui">
    <img :src="IconSVG" width="50" height="30" alt="" class="icon" />
    <ButtonWithState :on-click="importFromClipboard" :time="1000">
      <template #default> クリップボードからインポート </template>
      <template #loading>クリップボードを読み取り中……</template>
      <template #completed>クリップボードからインポートしました</template>
    </ButtonWithState>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store/data'
import ButtonWithState from './ButtonWithState.vue'
import IconSVG from '/icon.svg?url'

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
</script>

<style scoped>
.control-ui {
  background-color: #eee;
  height: 45px;
  padding: 10px;
  display: flex;
  gap: 10px;
}

@media print {
  .control-ui {
    display: none;
  }
}
</style>
