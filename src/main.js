import { createApp } from 'vue'
import App from './App.vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

import {
  LineChart
} from 'echarts/charts'
import {
  LabelLayout, UniversalTransition
} from 'echarts/features'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  TitleComponent, LegendComponent, GridComponent
} from 'echarts/components'
use([
  LineChart,
  LabelLayout, UniversalTransition,
  CanvasRenderer,
  TitleComponent, LegendComponent, GridComponent
])

createApp(App)
  .component('v-chart', ECharts)
  .mount('#app')
