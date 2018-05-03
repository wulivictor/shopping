<template>
<div class="goods">
  <div class="menu-wapper" ref="menuWapper">
    <ul v-show="goods">
      <li v-for="(item,index) in goods" class="menu-option">
          <span class="option-content"><span class="icon" v-show="item.type>0" :class=classMap[item.type]></span>
           {{item.name}}</span>
      </li>
    </ul>
  </div>
  <div class="goods-wapper" ref="goodsWapper">
    <ul>
      <li  v-for="item in goods" class="food-list">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item">
            <div class="food-icon">
              <img :src="food.icon">
            </div>
            <div class="content">
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p v-show="food.description" class="desc">{{food.description}}</p>
              </div>
              <div class="extra">
                <span class="sellnumber">月售{{food.sellCount}}份</span>
                <span class="comment">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now-price"><span style="font-size: 10px;font-weight:normal">￥</span>{{food.price}}</span>
                <s class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</s>
                <div class="buynumber">


                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
const ERRNO = 0
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    // 定义icon种类
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // goods数据
    this.$http.get('api/goods').then((response) => {
      response = response.data
      if (response.errno === ERRNO) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
        })
        // console.log(this.goods)
      }
    })
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWapper, {})
      this.goodsScroll = new BScroll(this.$refs.goodsWapper, {})
    }

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "good.styl"

</style>
