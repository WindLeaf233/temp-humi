<template>
  <NowTemp></NowTemp>
  <TempHumi :loadingInstance="loadingInstance"></TempHumi>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { ElLoading } from 'element-plus'

const loadingInstance = ElLoading.service({ fullscreen: true, lock: true })

const NowTemp = defineAsyncComponent(() => import('@/components/NowTemp'))
const TempHumi = defineAsyncComponent(() => import('@/components/TempHumi'))
</script>
