<template>
  <Suspense>
    <NowTemp ref="nowtemp"></NowTemp>
  </Suspense>
  <TempHumi ref="temphumi" :loadingInstance="loadingInstance"></TempHumi>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { ElLoading } from 'element-plus'
import * as current from '@/requests/current'

let timer
const NowTemp = defineAsyncComponent(() => import('@/components/NowTemp'))
const TempHumi = defineAsyncComponent(() => import('@/components/TempHumi'))

export default {
  name: 'App',
  components: {
    NowTemp, TempHumi
  },
  setup() {
    const nowtemp = ref(null)
    const temphumi = ref(null)

    const loadingInstance = ElLoading.service({ fullscreen: true, lock: true })

    async function updateData() {
      let data = await current.getData()
      console.log('updating data', data)

      nowtemp.value.updateData(data)
      temphumi.value.updateData(data)
    }

    timer = setInterval(updateData, 1000 * 60)

    return { loadingInstance, nowtemp, temphumi }
  },
  unmounted() {
    clearInterval(timer)
  }
}
</script>
