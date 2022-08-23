<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<div class="container">
    <span class="iconfont icon-wenshidujiancejilu" style="font-size:50px;margin-top: -20px;margin-bottom: -20px;color: aliceblue;margin-right: 10px;"></span>
    <a class="navbar-brand yc-ys" href="/">
			温湿度计
		</a>
		<div class="collapse navbar-collapse" id="navbar-primary">
			<div class="navbar-collapse-header" _msthidden="1">
				<div class="row" _msthidden="1">
					<div class="col-6 collapse-brand">
						<a href="javascript:void(0)">
						</a>
					</div>
					<div class="col-6 collapse-close" _msthidden="1">
						<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-primary"
						aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation"
						_mstaria-label="320099" _msthidden="A" _msthiddenattr="426439">
							<span>
							</span>
							<span>
							</span>
						</button>
					</div>
				</div>
			</div>
			<ul class="navbar-nav ml-lg-auto" _msthidden="6">
        <li class="nav-item" _msthidden="1">
          <a class="nav-link nav-link-icon" href="#" _msthidden="1">
            <span class="nav-link-inner--text d-lg-none" _msthash="1010997" _msttexthash="115531"
            _msthidden="1">
              Discover
            </span>
          </a>
        </li>
      </ul>
		</div>
    <a class="navbar-brand"  href="#">温湿度历史数据</a>
	</div>
</nav>
</div>

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

@media only screen and (min-width: 1024px) {
  .wh-test{
  display: none;
  }
  .card-th{
  border-radius:20px;
  margin: 10px;
}

.now .now-element {
  height: 300px;
}
.card-bg{
  margin: 20px;
}
.air-px{
  height: 20px;
}
.guindex{
  margin: 30px;
}

}
@media only screen and (max-width: 1023px) {
  .card-th{
  border-radius:20px;
  margin: 5px;
}
.now .now-element {
  height: 300px;
}
.guindex{
  margin: 0px;
}
}
@media only screen and (max-width: 992px) {
.yc-ys{
  display: none;
}
}

</style>