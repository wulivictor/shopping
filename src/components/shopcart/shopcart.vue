<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wapper" v-on:click="showShopCart">
          <div class="logo" v-bind:class="{'highlight' : (calcuteCount > 0) }">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="goodsCount" v-show="calcuteCount>0">
            {{calcuteCount}}
          </div>
        </div>
        <div class="price" v-bind:class="{'highlight' : calcutePrice > 0}" v-on:click="showShopCart">￥{{calcutePrice}}</div>
        <div class="desrc" v-on:click="showShopCart">另需配送费￥{{delivery}}元</div>
      </div>
      <div class="content-right">
        <div class="pay none" v-show="payDesrc == false">￥{{minprice}}起送</div>
        <div class="pay less" v-show="payDesrc !== true && payDesrc !== false">还差{{payDesrc}}元起送</div>
        <div class="pay enough" v-show="payDesrc == true" v-on:click="submitOrder">去结算</div>
      </div>
    </div>
    <div class="cartdetail" v-show="detailShow">
      <div class="title">
        <div class="cart">购物车</div>
        <div class="reset">清空</div>
      </div>
      <div class="content" ref="cartWapper">
        <ul>
          <li v-for="(food,index) in selectfoods" v-bind:key="index" class="foodlist">
            <div class="content-left">
              <div class="foodname">{{food.name}}</div>
            </div>
            <div class="content-right">
              <div class="food-price">{{food.price*food.count}}</div>
              <div class="cart-wapper">
                <cartcontroller :food="food"></cartcontroller>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import cartcontroller from '../../components/cartcontroller/cartcontroller.vue'
import BScroll from 'better-scroll'
export default {
  name: 'shopcart',
  components: {
    cartcontroller
  },
  data () {
    return {
      totalprice: 0,
      detailShow: true
    }
  },
  props: {
    selectfoods: {
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
  computed: {
    calcutePrice: {
      get: function () {
        let totalPrice = 0
        this.selectfoods.forEach((good) => {
          totalPrice += good.price * good.count
        })
        return totalPrice
      }
    },
    calcuteCount () {
      let totalCount = 0
      this.selectfoods.forEach((good) => {
        totalCount += good.count
      })
      return totalCount
    },
    payDesrc () {
      let totalPrice = 0
      this.selectfoods.forEach((good) => {
        totalPrice += good.price * good.count
      })
      // debugger
      if (totalPrice === 0) {
        return false
      } else if (totalPrice > 0 && totalPrice < this.minprice) {
        return this.minprice - totalPrice
      } else {
        return true
      }
    }
  },
  created () {
    this._initScroll()
  },
  methods: {
    submitOrder () {
      return 0
    },
    showShopCart () {
      this.detailShow = !this.detailShow
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.cartWapper, {
        click: true
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "shopcart.styl"
</style>
