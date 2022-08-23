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
</template>

<script setup>
import { ref } from 'vue'
import * as getList from '@/requests/getList'
import * as list from '@/utils/list'

const option = ref({

})

// 日期时间范围选择
let datetimeFilter = ref('')
// eslint-disable-next-line
function onDatetimeFilterUpdate() {
  let f = datetimeFilter
  getExistData(f[0], f[1])
}

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

// eslint-disable-next-line
function updateData(data) {
  originalDataList.push(data)
  updateList()
}
</script>