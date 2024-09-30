import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default {
  root: 'src',
  plugins: [vue()],
  build: {
    outDir: '../dist',
  },
} satisfies UserConfig
