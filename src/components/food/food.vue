<template>
  <div v-show="showFlag" class="food" ref="foodWapper">
    <div class="page-scroll">
      <div class="food-detail">
        <img v-bind:src="food.image" class="food-image">
        <div class="food-msg">
          <h2>{{food.name}}</h2>
          <p class="desc"><span class="sellcount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span></p>
          <div class="cart">
            <div class="price">
            <span class="nowprice">
              <span style="font-size: 10px;font-weight: normal">￥</span>
              {{food.price}}
            </span>
              <span class="oldprice" v-show="food.oldPrice">
              <span style="font-weight: normal">￥</span>
              {{food.oldPrice}}
            </span>
            </div>
            <div class="addcart">
              <div class="addbtn" @click="addcart" v-bind:hidden="food.count || !food.count===0">加入购物车</div>
            </div>
          </div>
        </div>
      </div>
      <div class="food-intro" v-show="food.info">
        <h2>商品介绍</h2>
        <p class="desc">{{food.info}}</p>
      </div>
      <div class="food-rating" v-show="food.ratings">
        <div class="header">
          <h2>商品评论</h2>
          <div class="btn-group">
            <div class="all">全部<span class="ratingtotal"></span></div>
            <div class="recommand">推荐</div>
            <div class="gag">吐槽</div>
          </div>
          <div class="ratingoption">
            <i class="icon-check_circle"></i><span>只看有内容的评论</span>
          </div>
        </div>
        <div class="content">

        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import vue from 'vue'
export default {
  name: 'food',
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addcart () {
      debugger
      vue.set(this.food, 'count', 1)
    },
    initSCroll () {
      this.foodScroll = new BScroll(this.$refs.foodWapper, {
        click: true
      })
    },
    show () {
      this.showFlag = true
    }
  },
  created () {
    this.$nextTick(() => {
      this.initSCroll()
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "food.styl"
</style>
