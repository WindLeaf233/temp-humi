<template>
  <Suspense>
    <div class="now">
      <NowTemp class="now-element" ref="nowtemp"></NowTemp>
      <NowHumi class="now-element" ref="nowhumi"></NowHumi>
    </div>
  </Suspense>
  <TempHumi ref="temphumi" :loadingInstance="loadingInstance"></TempHumi>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { ElLoading } from 'element-plus'
import * as current from '@/requests/current'
import '@/styles/argon-design-system.min.css'

let timer
const NowTemp = defineAsyncComponent(() => import('@/components/NowTemp'))
const NowHumi = defineAsyncComponent(() => import('@/components/NowHumi'))
const TempHumi = defineAsyncComponent(() => import('@/components/TempHumi'))

export default {
  name: 'App',
  components: {
    NowTemp, NowHumi, TempHumi
  },
  setup() {
    const nowtemp = ref(null)
    const nowhumi = ref(null)
    const temphumi = ref(null)

    const loadingInstance = ElLoading.service({ fullscreen: true, lock: true })

    async function updateData() {
      let data = await current.getData()
      console.log('updating data', data)

      nowtemp.value.updateData(data)
      nowhumi.value.updateData(data)
      temphumi.value.updateData(data)
    }

    timer = setInterval(updateData, 1000 * 60)

    return { loadingInstance, nowtemp, nowhumi, temphumi }
  },
  unmounted() {
    clearInterval(timer)
  }
}
</script>

<style scoped>
.now .now-element {
  height: 300px;
}
</style>