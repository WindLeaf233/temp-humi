<template>
  <v-chart
    class="chart"
    :option="option"
    :autoresize="true"
    @datazoom="datazoom($event)"
  ></v-chart>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent, LegendComponent, GridComponent, TooltipComponent,
  DataZoomComponent, VisualMapComponent
} from 'echarts/components'
import { ref, defineProps, defineExpose } from 'vue'
import { createDeviceDetector } from 'next-vue-device-detector'
import * as getList from '@/requests/getList'
import * as list from '@/utils/list'

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    LegendComponent,
    GridComponent,
    TooltipComponent,
    DataZoomComponent,
    VisualMapComponent
])

const device = createDeviceDetector()
const props = defineProps(['loadingInstance'])

let originalDataList = []

function getTimeList() {
  let temp = []
  for (let column of originalDataList) {
    if (column !== null && column !== undefined) {
      temp.push(column.date)
    }
  }
  return temp
}

function getDataList(type) {
  let temp = []
  for (let column of originalDataList) {
    if (column !== null && column !== undefined) {
      temp.push(column[type])
    }
  }
  return temp
}

const option = ref({
  title: {
    text: '温湿度变化',
    left: 'center'
  },
  legend: {
    data: ['温度', '湿度'],
    left: 5
  },
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: -30,
      max: 50,
      color: ['#e64343', '#ffaa6d', '#32c6ce']
    }
  ],
  grid: {
    left: device.mobile ? '10%' : '3%',
    right: device.mobile ? '10%' : '3%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      animation: true,
      label: {
        backgroundColor: '#505765'
      }
    }
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      realtime: true,
      start: 0,
      end: 100
    }
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: [
    {
      name: '温度',
      type: 'value',
      axisLabel: {
        formatter: '{value}℃'
      }
    },
    {
      name: '湿度',
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ],
  series: [
    {
      name: '温度',
      type: 'line',
      smooth: true,
      data: [],
      markPoint: {
        data: [
          { type: 'max', name: '最高温度' },
          { type: 'min', name: '最低温度' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均温度' }]
      },
      showSymbol: false,
      lineStyle: {
        width: 2
      }
    },
    {
      name: '湿度',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [],
      markPoint: {
        data: [
          { type: 'max', name: '最高湿度' },
          { type: 'min', name: '最低湿度' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均湿度' }]
      },
      showSymbol: false,
      lineStyle: {
        width: 2
      }
    }
  ]
}, { deep: true })

let zoomStart = 0
let zoomEnd = 100

// eslint-disable-next-line
function datazoom(e) {
  let data = 'batch' in e ? e.batch[0] : e
  zoomStart = data.start
  zoomEnd = data.end
}

function updateList() {
  option.value.xAxis.data = getTimeList()
  option.value.series[0].data = getDataList('temp')
  option.value.series[1].data = getDataList('humi')
  for (let zoom of option.value.dataZoom) {
    zoom.start = zoomStart
    zoom.end = zoomEnd
  }
}

async function getExistData(data) {
  originalDataList = list.deleteEmpty(originalDataList)
  let _data = await getList.getList(data)
  for (let item of _data) {
    originalDataList.push({
      date: item.date,
      temp: item.temp,
      humi: item.humi
    })
  }
  updateList()
}

function updateData(data) {
  originalDataList.push(data)
  updateList()
}

defineExpose({
  updateData
})

let today = (new Date()).toISOString().split('T')[0].split('-').join('')
getExistData({ date: today })
updateData()

props.loadingInstance.close()
</script>

<style scoped>
.chart {
  height: 500px;
}
</style>
