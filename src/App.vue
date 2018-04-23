<template>
  <div id="app">
    <v-head :seller=seller></v-head>
    <div class="nav border-1px">
      <div class="nav-item ">
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

const ERROR_OK = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('api/seller').then((response) => {
      response = response.body

      if (response.errno === ERROR_OK) {
        this.seller = response.data
      }
    })
  },
  name: 'App',
  components: {
    'v-head': header

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .nav
    width :100%
    text-align: center
    display: flex
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
    .nav-item
      flex: 1
      &>a
        display block
        width 100%
        height 100%
        text-decoration none
        font-size 14px
        color rgb(77,85,93)
        font-weight 200
      &>a.active
        color rgb(240,20,20)

</style>
