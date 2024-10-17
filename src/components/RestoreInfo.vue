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
      <li v-for="i in Math.floor(data.length / 500)" :key="i">
        <QrcodeVue
          :value="
            `sawagani ${i}/${Math.floor(data.length / 500)} ` +
            data.substring(i * 500, (i + 1) * 500)
          "
          :size="175"
          level="L"
          render-as="svg"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { useDataStore } from '../store/data'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { toBase64 } from '../lib/base64'

const dataStore = useDataStore()
const { serialized } = storeToRefs(dataStore)

const data = computed(() => toBase64(JSON.stringify(serialized.value)))
</script>

<style scoped>
.codes {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 2rem 0;
  padding: 0;

  li {
    list-style: none;
  }
}
</style>
