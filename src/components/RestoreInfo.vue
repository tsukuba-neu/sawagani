<template>
  <div>
    <img
      src="/icon.svg"
      alt="🦀"
      width="50"
      height="50"
      style="filter: grayscale(1)"
    />
    <p>
      このページは、書き出した収支計算書をsawaganiで再編集するためのものです。このページを提出する必要はありません。
    </p>
    <ul class="codes">
      <li v-for="i in Math.ceil(data.length / chunkSize)" :key="i">
        <QrCode
          :value="
            `swgn ${i}/${Math.ceil(data.length / chunkSize)} ` +
            data.substring(
              (i - 1) * chunkSize,
              Math.min(i * chunkSize, data.length),
            )
          "
          :size="150"
          level="L"
          render-as="svg"
          :overlay="i.toString()"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import QrCode from './QrCode.vue'
import { useDataStore } from '../store/data'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const chunkSize = 300
const dataStore = useDataStore()
const { serializedString } = storeToRefs(dataStore)

const data = computed(() => encodeURIComponent(serializedString.value))
</script>

<style scoped>
.codes {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin: 2rem 0;
  padding: 0;

  li {
    list-style: none;
  }
}
</style>
