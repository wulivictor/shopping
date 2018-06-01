<template>
  <div v-show="showFlag" class="food">
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
            <div class="addbtn">加入购物车</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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
    show () {
      this.showFlag = true
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "food.styl"
</style>
