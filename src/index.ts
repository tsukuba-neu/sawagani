import { createApp } from 'vue'
import App from './App.vue'
import './global.css'
import { createPinia } from 'pinia'
import { useDataStore } from './store/data'
import { fromBase64, toBase64 } from './lib/base64'

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')

const dataStore = useDataStore()

try {
  const serialized = JSON.parse(fromBase64(location.hash.slice(1)))
  dataStore.parse(serialized)
} catch {}

dataStore.$subscribe((mutation) => {
  const serialized = toBase64(JSON.stringify(dataStore.serialized))
  history.replaceState(null, '', `#${serialized}`)
})
