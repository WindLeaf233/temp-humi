<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<div class="container">
    <svg t="1661259666137" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1996" width="16" height="16"><path d="M716.444246 745.001942a276.877953 276.877953 0 0 1-82.062143 197.31892A278.883284 278.883284 0 0 1 436.437407 1023.999004a278.883284 278.883284 0 0 1-197.944697-81.678142A276.892175 276.892175 0 0 1 156.44479 745.001942c0-72.391041 27.932417-141.226529 77.809702-193.023812V168.390947c0-48.071064 24.40531-93.596353 66.033714-124.984767C337.607281 15.274652 385.9059 0 436.437407 0c50.545729 0 98.844348 15.274652 136.163423 43.40618 41.628404 31.388414 66.033714 76.913703 66.033714 124.984767V551.963908a277.688619 277.688619 0 0 1 77.809702 193.023812zM574.634606 168.390947c0-27.235529-14.449764-54.186614-40.561739-73.884372C508.160004 74.979483 473.443593 63.999938 436.437407 63.999938c-36.991964 0-71.722597 10.979545-97.621239 30.506637-26.111975 19.683536-40.561738 46.648844-40.561738 73.884372v410.794268l-10.097768 9.486213A213.788237 213.788237 0 0 0 220.444728 745.001942c0 57.457722 22.399978 111.331447 63.217716 151.978519A214.883347 214.883347 0 0 0 436.437407 959.999067a214.897569 214.897569 0 0 0 152.789185-63.018606 212.892237 212.892237 0 0 0 63.217716-151.978519c0-59.448831-24.391087-115.654999-67.711934-156.330514l-10.097768-9.486213V168.390947z" p-id="1997" fill="#ffffff"></path><path d="M488.192023 620.145175V198.968695c0-21.518201-23.1822-38.968851-51.754616-38.968851s-51.740394 17.45065-51.740394 38.968851v421.17648c-44.913734 19.76887-76.245259 64.497715-76.24526 116.508331 0 70.328821 57.301278 127.345654 127.999876 127.345654 70.684376 0 127.999876-57.016833 127.999876-127.345654 0-52.024838-31.345747-96.739462-76.259482-116.508331zM684.444277 220.799785c0-24.490643 14.591986-54.442614 38.940406-88.87458a535.423479 535.423479 0 0 1 37.247964-46.719955l11.804433-12.942209 11.818655 12.942209 3.313775 3.726219a535.423479 535.423479 0 0 1 33.934189 42.993736c8.519103 12.046211 15.943096 23.779532 21.987534 35.015077 10.865767 20.195536 16.952872 38.129741 16.952873 53.859503 0 54.314614-38.840851 99.199904-87.992804 99.199904-49.166174 0-88.007026-44.88529-88.007025-99.199904z m65.066603-70.399931c-20.664869 29.226638-33.066635 54.684391-33.066634 70.399931 0 37.589297 25.62842 67.199935 56.007056 67.199935 30.364415 0 55.992834-29.610638 55.992835-67.199935 0-9.329769-4.551107-22.755533-13.141321-38.712851a310.598809 310.598809 0 0 0-19.911092-31.68708 501.546179 501.546179 0 0 0-22.940422-29.866638c-7.836437 9.471991-15.644429 19.569759-22.940422 29.866638z" p-id="1998" fill="#ffffff"></path></svg>
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