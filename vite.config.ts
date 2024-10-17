import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    root: 'src',
    base: env.VITE_BASE,
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: '@tsukuba-neu/sawagani',
          short_name: 'sawagani',
          theme_color: '#e34944',
          scope: env.VITE_BASE,
          start_url: env.VITE_BASE,
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        pwaAssets: {
          image: 'public/icon.svg',
        },
      }),
    ],
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
  }
})
