<template>
  <v-chart class="chart" :option="option"></v-chart>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent, LegendComponent, GridComponent, TooltipComponent,
  DataZoomComponent, ToolboxComponent, VisualMapComponent
} from 'echarts/components'
import { ref, defineProps } from 'vue'
import { createDeviceDetector } from 'next-vue-device-detector'
import * as loopUpdate from '@/requests/loopUpdate'

const props = defineProps(['loadingInstance'])

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    LegendComponent,
    GridComponent,
    TooltipComponent,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent
])

let timer

export default {
  name: 'TempHumi',
  setup() {
    const device = createDeviceDetector()

    const originalDataList = []

    // const originalData = [
    //   { addtime: '08/21 05:23', temp: 40, humi: 50 },
    //   { addtime: '08/21 05:24', temp: 30, humi: 60 },
    //   { addtime: '08/21 05:25', temp: 20, humi: 30 },
    //   { addtime: '08/21 05:26', temp: -25, humi: 10 }
    // ]

    function getTimeList() {
      let temp = []
      for (let column of originalDataList) {
        temp.push(column.time)
      }
      return temp
    }

    function getDataList(type) {
      let temp = []
      for (let column of originalDataList) {
        temp.push(column[type])
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
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {}
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

    async function updateData() {
      console.log('updating data')
      let data = await loopUpdate.getData()
      console.log('get data', data)
      originalDataList.push(data)
      option.value.xAxis.value.data = getTimeList()
      option.value.series.value[0].data = getDataList('temp')
      option.value.series.value[1].data = getDataList('humi')
    }

    updateData()

    timer = setInterval(updateData, 1000 * 60)

    props.loadingInstance.close()

    return { option }
  },
  unmounted() {
    clearInterval(timer)
  }
}
</script>

<style scoped>
.chart {
  height: 500px;
}
</style>
