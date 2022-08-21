<template>
  <VeLine :data="data"></VeLine>
</template>

<script setup>
import VeLine from 'v-charts/lib/line.common'

const originalData = [
  { addtime: '08/21 05:23', temp: 40, humi: 50 },
  { addtime: '08/21 05:24', temp: 30, humi: 60 },
  { addtime: '08/21 05:25', temp: 20, humi: 30 }
]

function parseData() {
  let mapping = {
    addtime: '日期', temp: '温度', humi: '湿度'
  }

  let columns = []
  for (let key in mapping) {
    columns.push(mapping[key])
  }

  let rows = []
  for (let dataRow of originalData) {
    let row = {}
    for (let rowKey in dataRow) {
      row[mapping[rowKey]] = dataRow[rowKey]
    }
    rows.push(row)
  }

  return { columns, rows }
}

const data = parseData()
</script>
