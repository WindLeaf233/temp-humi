<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <span class="iconfont icon-wenshidujiancejilu" style="font-size:50px;margin-top: -20px;margin-bottom: -20px;color: aliceblue;margin-right: 10px;"></span>
        <a class="navbar-brand yc-ys" href="/">
          温湿度计
        </a>
        <div class="collapse navbar-collapse" id="navbar-primary">
        </div>
        <a class="navbar-brand"  href="#">温湿度历史数据</a>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@media only screen and (min-width: 1024px) {
  .wh-test{
  display: none;
  }
  .card-th{
  border-radius:20px;
  margin: 10px;
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
