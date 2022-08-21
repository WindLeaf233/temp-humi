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
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, defineComponent } from 'vue'

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

export default defineComponent({
  name: 'TempHumi',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'light'
  },
  setup: () => {
    const originalData = [
      { addtime: '08/21 05:23', temp: 40, humi: 50 },
      { addtime: '08/21 05:24', temp: 30, humi: 60 },
      { addtime: '08/21 05:25', temp: 20, humi: 30 },
      { addtime: '08/21 05:26', temp: -25, humi: 10 }
    ]

    function getTimeList() {
      let temp = []
      for (let column of originalData) {
        temp.push(column.addtime)
      }
      return temp
    }

    function getDataList(type) {
      let temp = []
      for (let column of originalData) {
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
      grid: { left: '3%', right: '3%' },
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
        data: getTimeList()
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
          data: getDataList('temp'),
          markPoint: {
            data: [
              { type: 'max', name: '最高温度' },
              { type: 'min', name: '最低温度' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: '平均温度' }]
          },
          showSymbol: false
        },
        {
          name: '湿度',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: getDataList('humi'),
          markPoint: {
            data: [
              { type: 'max', name: '最高湿度' },
              { type: 'min', name: '最低湿度' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: '平均湿度' }]
          },
          showSymbol: false
        }
      ]
    })

    return { option }
  }
})

// import { LinesChart } from 'echarts/charts'
//
// const originalData = [
//   { addtime: '08/21 05:23', temp: 40, humi: 50 },
//   { addtime: '08/21 05:24', temp: 30, humi: 60 },
//   { addtime: '08/21 05:25', temp: 20, humi: 30 }
// ]
//
// function parseData() {
//   let mapping = {
//     addtime: '日期', temp: '温度', humi: '湿度'
//   }
//
//   let columns = []
//   for (let key in mapping) {
//     columns.push(mapping[key])
//   }
//
//   let rows = []
//   for (let dataRow of originalData) {
//     let row = {}
//     for (let rowKey in dataRow) {
//       row[mapping[rowKey]] = dataRow[rowKey]
//     }
//     rows.push(row)
//   }
//
//   return { columns, rows }
// }
//
// const data = parseData()
</script>

<style scoped>
.chart {
  height: 500px;
}
</style>
