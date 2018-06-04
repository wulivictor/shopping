<template>
<div class="goods">
  <div class="menu-wapper" ref="menuWapper">
    <ul v-show="goods">
      <li v-for="(item,index) in goods" class="menu-option" :class="currentIndex === index? 'current' : ''" v-on:click="selectMenu(index)" v-bind:key="index">
          <span class="option-content"><span class="icon" v-show="item.type>0" :class=classMap[item.type]></span>
           {{item.name}}</span>
      </li>
    </ul>
  </div>
  <div class="goods-wapper" ref="goodsWapper">
    <ul>
      <li  v-for="(item,index) in goods" class="food-list food-list-hook" v-bind:key="index">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="(food,index) in item.foods"  @click.stop="lookDetail(food,$event)"  class="food-item" v-bind:key="index">
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
                <span class="comment">好评率{{food.rating}}% </span>
              </div>
              <div class="price">
                <span class="now-price"><span style="font-size: 10px;font-weight:normal">￥</span>{{food.price}}</span>
                <s class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</s>
                <div class="buynumber">
                </div>
              </div>
              <div class="cartcontroller-wapper">
                <cartcontroller :food = food></cartcontroller>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart :delivery="seller.deliveryPrice" :minprice="seller.minPrice" :selectfoods.sync="selectfoods"></shopcart>
  <food :food="selectfood" :ratings="selectfood.ratings" ref="food"></food>
</div>
</template>

<script type="text/ecmascript-6">
import shopcart from '../../components/shopcart/shopcart.vue'
import cartcontroller from '../../components/cartcontroller/cartcontroller.vue'
import BScroll from 'better-scroll'
import food from '../../components/food/food.vue'
const ERRNO = 0
export default {
  name: 'goods',
  components: {
    shopcart,
    cartcontroller,
    food
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      menuscroll: 0,
      selectfood: {} // 这个selectf为点击food时选择的food，为了进入food详情页
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let Height1 = this.listHeight[i]
        let Height2 = this.listHeight[i + 1]
        if (!Height2 || (this.scrollY >= Height1 && this.scrollY < Height2)) {
          // console.log('this.scrollY:' + this.scrollY + '\n' + 'h1:' + Height1 + '\n' + 'h2:' + Height2)
          return i
        }
      }
    },
    selectfoods () {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
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
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWapper, {
        click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goodsWapper, {
        probeType: 3,
        click: true,
        preventDefault: true
      })
      this.goodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let fooditemlist = this.$refs.goodsWapper.getElementsByClassName('food-list-hook')
      this.listHeight.push(0)
      let temp = 0
      for (let i = 0; i < fooditemlist.length; i++) {
        temp += fooditemlist[i].clientHeight
        this.listHeight.push(temp)
      }
    },
    // 定义左侧菜单按钮的功能
    selectMenu (index) {
      this.goodsScroll.scrollTo(0, (0 - this.listHeight[index]), 500)
      //  this.$refs.menuWapper.getElementsByClassName('menu-option')[index].classList.add('current')
    },
    // 点击商品后将food信息传递给子组件
    lookDetail (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectfood = food
      this.$refs.food.show() // 调用子组件的方法
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "good.styl"
</style>
