<template>
  <v-chart :option="option"></v-chart>
</template>

<script setup>
import { use } from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { ref, defineExpose } from 'vue'
import { createDeviceDetector } from 'next-vue-device-detector'
import * as current from '@/requests/current'

use([
  GaugeChart
])

const device = createDeviceDetector()

const option = ref({
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: -30,
      max: 50,
      splitNumber: 10,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 10,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        distance: device.mobile ? -10 : -15,
        color: '#999',
        fontSize: 18
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-15%'],
        fontSize: device.mobile ? 30 : 35,
        fontWeight: 'bolder',
        formatter: '{value}°C',
        color: 'inherit'
      },
      data: [
        {
          value: 20
        }
      ]
    },
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: -30,
      max: 50,
      itemStyle: {
        color: '#FD7347'
      },
      progress: {
        show: true,
        width: 8
      },
      pointer: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 20
        }
      ]
    }
  ]
})

// eslint-disable-next-line
function updateData(data) {
  let temp = data.temp
  option.value.series[0].data[0].value = temp
  option.value.series[1].data[0].value = temp
}

defineExpose({
  updateData
})

let data = await current.getData()
updateData(data)
</script>
