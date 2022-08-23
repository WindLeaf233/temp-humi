<template>
  <NavBar></NavBar>
  <div class="guindex">
    <Suspense>
      <div class="now">
        <div class="container">
          <div class="row">
            <div class="col card card-th">
              <div class="air-px"></div>
              <NowTemp class="now-element" ref="nowtemp"></NowTemp>
            </div>
            <div class="w-100 wh-test"></div>
            <div class="col card card-th">
              <div class="air-px"></div>
              <NowHumi class="now-element" ref="nowhumi"></NowHumi>
            </div>
        </div>
        </div>
      </div>
    </Suspense>
    <div>
    <TempHumi ref="temphumi" :loadingInstance="loadingInstance"></TempHumi>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { ElLoading } from 'element-plus'
import NavBar from '@/components/NavBar'
import * as current from '@/requests/current'
import '@/styles/argon-design-system.min.css'
import '@/styles/iconfont.css'

let timer
const NowTemp = defineAsyncComponent(() => import('@/components/NowTemp'))
const NowHumi = defineAsyncComponent(() => import('@/components/NowHumi'))
const TempHumi = defineAsyncComponent(() => import('@/components/TempHumi'))

export default {
  name: 'App',
  components: {
    NavBar,
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

@media only screen and (min-width: 1024px) {
  .wh-test {
    display: none;
  }

  .card-th {
    border-radius: 20px;
    margin: 10px;
  }

  .card-bg {
    margin: 20px;
  }

  .air-px {
    height: 20px;
  }

  .guindex {
    margin: 30px;
  }
}

@media only screen and (max-width: 1023px) {
  .card-th {
    border-radius: 20px;
    margin: 5px;
  }

  .now .now-element {
    height: 300px;
  }

  .guindex {
    margin: 0px;
  }
}
</style>