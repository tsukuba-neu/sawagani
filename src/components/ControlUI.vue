<template>
  <div class="control-ui">
    <ButtonWithState :onClick="importFromClipboard" :time="1000">
      <template v-slot:default> クリップボードからインポート </template>
      <template v-slot:loading>クリップボードを読み取り中……</template>
      <template v-slot:completed>クリップボードからインポートしました</template>
    </ButtonWithState>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store/data'
import ButtonWithState from './ButtonWithState.vue'

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
  padding: 10px;
}

@media print {
  .control-ui {
    display: none;
  }
}
</style>
