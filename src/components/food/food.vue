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
            <div class="all" @click="changeRate">全部<span class="ratingtotal"></span></div>
            <div class="recommand">推荐</div>
            <div class="gag">吐槽</div>
          </div>
          <div class="ratingoption">
            <i class="icon-check_circle"></i><span>只看有内容的评论</span>
          </div>
        </div>
        <div class="content">
          <ul>
            <li class="rate-item" v-for="(rate, index) in selectrating" v-bind:key="index">
              <div class="rate-msg">
                <div class="rate-time">{{rate.rateTime | formatDate}}</div>
                <div class="rate-headimg" v-bind:style="{backgroundImage:'url(' + rate.avatar + ')'}"></div>
                <div class="rate-name">{{rate.username}}</div>
              </div>
              <div class="rate-content" >
                <i v-bind:class="[rate.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down']"></i>
                <span class="rate-text" v-show="rate.text !== ''">{{rate.text}}</span>
                <span class="rate-text" v-show="rate.text === '' && rate.rateType === 0">GOOD</span>
                <span class="rate-text" v-show="rate.text === '' && rate.rateType === 1">NOT GOOD</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {formatDate} from '../../common/js/date'
import BScroll from 'better-scroll'
import vue from 'vue'
export default {
  name: 'food',
  props: {
    food: {
      type: Object
    },
    ratings: {
      type: Array
    }
  },
  data () {
    return {
      showFlag: false,
      selectrating: []
    }
  },
  methods: {
    changeRate () {
      alert(1)
    },
    addcart () {
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
    this.$nextTick(() => { // 初始化滑动组件
      this.initSCroll()
    })
  },
  computed: {
    // selectratings () {
    //   return this.ratings
    // }
  },
  watch: {
    ratings (val) {
      this.selectrating = this.ratings
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "food.styl"
</style>
