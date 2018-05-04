<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wapper">
          <div class="logo" v-bind:class="[(calcuteCount > 0) ? 'highlight' : '']">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="goodsCount" v-show="calcuteCount>0">
            {{calcuteCount}}
          </div>
        </div>
        <div class="price">￥{{calcutePrice}}</div>
        <div class="desrc">另需配送费￥{{delivery}}元</div>
      </div>
      <div class="content-right">
        <div class="pay less" v-show="totalprice < delivery">￥{{minprice}}起送</div>
        <div class="pay more" v-show="totalprice >= delivery">去结算</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import $ from 'jquery'
export default {
  name: 'shopcart',
  data () {
    return {
      totalprice: 0
    }
  },
  props: {
    goodArray: {
      type: Array,
      default: () => {
        return [
          {
            price: 0,
            count: 0
          }
        ]
      }
    },
    delivery: {
      type: Number,
      default: 0
    },
    minprice: {
      type: Number,
      default: 0
    }
  },
  methods: {},
  computed: {
    calcutePrice () {
      let totalPrice = 0
      this.goodArray.forEach((good) => {
        totalPrice += good.price * good.count
      })
      return totalPrice
    },
    calcuteCount () {
      let totalCount = 0
      this.goodArray.forEach((good) => {
        totalCount += good.count
      })
      return totalCount
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "shopcart.styl"
</style>
