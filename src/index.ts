import { createApp } from 'vue'
import App from './App.vue'
import './global.css'
import { createPinia } from 'pinia'
import { useDataStore } from './store/data'
import { serialize, deserialize } from './lib/serialization'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.mount('#app')

const dataStore = useDataStore()

try {
  const serialized = deserialize<typeof dataStore.serialized>(
    location.hash.slice(1),
  )
  dataStore.parse(serialized)
} catch (e) {
  console.warn('URL hashのデータがparseできませんでした', e)
}

dataStore.$subscribe(() => {
  const serialized = serialize(dataStore.serialized)
  history.replaceState(null, '', `#${serialized}`)
})
