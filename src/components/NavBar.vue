<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <span class="iconfont icon-wenshidujiancejilu" style="font-size:50px;margin-top: -20px;margin-bottom: -20px;color: aliceblue;margin-right: 10px;"></span>
        <router-link class="navbar-brand yc-ys" to="/">
          温湿度计
        </router-link>
        <div class="collapse navbar-collapse" id="navbar-primary">
        </div>
        <router-link class="navbar-brand" to="/history">温湿度历史数据</router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 992px) {
  .yc-ys {
    display: none;
  }
}
</style>
