<template>
  <div id="app">
    <v-head></v-head>
    <div class="nav">
      <div class="nav-item">
        <a v-link="{path:'/good'}">商品</a>
      </div>
      <div class="nav-item">
        <a v-link="{path:'/rating'}">评论</a>
      </div>
      <div class="nav-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>

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
    text-align :center
    display :flex
    height :40px
    line-height :40px
    .nav-item
      flex :1
</style>
