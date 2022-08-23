import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView'
import HistoryView from '@/views/HistoryView'

const routes = [
  { path: '/', component: MainView },
  { path: '/history', component: HistoryView }
]

export default createRouter({
  routes,
  history: createWebHistory()
})
