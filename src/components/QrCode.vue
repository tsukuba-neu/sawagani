<template>
  <span class="qrcode">
    <QrCodeVue
      :value="value"
      :size="size"
      :level="level"
      :render-as="renderAs"
    />
    <span
      v-if="overlay"
      class="overlay"
      :style="{
        width: size * 0.1 + 'px',
        height: size * 0.1 + 'px',
        lineHeight: size * 0.1 + 'px',
        fontSize: size * 0.1 * 0.9 + 'px',
      }"
      >{{ overlay }}</span
    >
  </span>
</template>

<script setup lang="ts">
import QrCodeVue from 'qrcode.vue'
const { value, size, level, renderAs, overlay } = defineProps<{
  value: string
  size: number
  level: 'L' | 'M' | 'Q' | 'H'
  renderAs: 'canvas' | 'svg'
  overlay?: string
}>()
</script>

<style scoped>
.qrcode {
  display: inline-block;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 0.2em;
  font-family: monospace;
  font-weight: bold;
  text-align: center;
}
</style>
