<template>
  <el-date-picker
    v-model="datetimeFilter"
    type="datetimerange"
    range-separator="到"
    start-placeholder="开始时间"
    end-placeholder="截止时间"
    value-format="YYYY-MM-DD HH:mm:ss"
    @change="onDatetimeFilterUpdate"
  ></el-date-picker>
  <v-chart
    class="chart"
    :option="option"
    :autoresize="true"
    @datazoom="datazoom($event)"
  ></v-chart>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent, LegendComponent, GridComponent, TooltipComponent,
  DataZoomComponent, ToolboxComponent, VisualMapComponent
} from 'echarts/components'
import { ref } from 'vue'
import { createDeviceDetector } from 'next-vue-device-detector'
import * as loopUpdate from '@/requests/loopUpdate'
import * as getList from '@/requests/getList'

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
  props: ['loadingInstance'],
  setup(props) {
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
        temp.push(column.date)
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

    // 日期时间范围选择
    let datetimeFilter = ref('')
    function onDatetimeFilterUpdate() {
      let f = datetimeFilter
      getExistData(f[0], f[1])
    }

    let zoomStart = 0
    let zoomEnd = 100

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

    async function updateData() {
      console.log('updating data')
      let data = await loopUpdate.getData()
      console.log('get data', data)
      originalDataList.push(data)
      updateList()
    }

    let today = (new Date()).toISOString().split('T')[0].split('-').join('')
    getExistData({ date: today })
    updateData()

    timer = setInterval(updateData, 1000 * 60)

    props.loadingInstance.close()

    return { option, datazoom, datetimeFilter, onDatetimeFilterUpdate }
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
