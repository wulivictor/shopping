<template>
  <div id="app">
    <v-head></v-head>
    <div class="nav">
      <div class="nav-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="nav-item">
        <router-link to="rating">评论</router-link>

      </div>
      <div class="nav-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header'

export default {
  name: 'App',
  components: {
    'v-head': header

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .nav
    text-align: center
    display: flex
    height: 40px
    line-height: 40px
    .nav-item
      flex: 1
</style>
