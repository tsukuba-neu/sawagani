import { createApp } from 'vue'
import App from './App.vue'
import './global.css'
import { createPinia } from 'pinia'
import { SerializedData, useDataStore } from './store/data'
import { deserialize } from './lib/serialization'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.mount('#app')

const dataStore = useDataStore()

let hash
try {
  hash = decodeURIComponent(location.hash.slice(1))
} catch {
  throw new Error('URL hashのデコードに失敗しました')
}

if (hash) {
  try {
    const serialized = deserialize<SerializedData>(hash)
    dataStore.parse(serialized)
  } catch (e) {
    console.warn('URL hashのデータがparseできませんでした', e)
  }
}

dataStore.$subscribe(() => {
  const serialized = dataStore.serializedString
  history.replaceState(null, '', `#${encodeURIComponent(serialized)}`)
})
