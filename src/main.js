import { createApp } from 'vue'
import App from './App.vue'
import VeLine from 'v-charts/lib/line.common'

createApp(App)
  .component('VeLine', VeLine)
  .mount('#app')
