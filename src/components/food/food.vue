<template>
  <div v-show="showFlag" class="food" ref="foodWapper" id="foodWapper"> <!-- @touchstart='touchStart' @touchend='touchEnd' -->
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
              <div class="addbtn" @click="addcart" v-bind:hidden="food.count || !food.count === 0">加入购物车</div>
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
            <div class="all" @click="changeRate('all')">全部<span class="ratingtotal"></span></div>
            <div class="recommand" @click="changeRate('recommand')">推荐</div>
            <div class="gag" @click="changeRate('gag')">吐槽</div>
          </div>
          <div class="ratingoption">
            <i  class="icon-check_circle" v-bind:class="[rateoption.showcontent ? 'checked' : '']" @click="showContent()"></i><span>只看有内容的评论</span>
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
      selectrating: [],
      rateoption: {
        showcontent: false,
        changerate: 0 /* 0是all 1是recommand 2是gag */
      },
      startX: 0, // 开始位置
      endX: 0, // 结束位置
      disX: 0 // 滑动的距离
    }
  },
  methods: {
    touchstart () {
      this.$refs.foodWapper.addEventListener('touchstart', (evt) => {
        evt = evt || window.event
        this.startX = evt.touches[0].clientX
        if (evt.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!evt.defaultPrevented) {
            evt.preventDefault()
          }
        }
      },
      { passive: false }
      )
    },
    touchend () {
      let foodwapper = this.$refs.foodWapper
      foodwapper.addEventListener('touchend', (evt) => {
        evt = evt || window.event
        this.endX = evt.changedTouches[0].clientX
        if ((this.endX - this.startX) > 80) {
          // 可以隐藏
          foodwapper.style.display = 'none'
        }
        if (evt.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!evt.defaultPrevented) {
            evt.preventDefault()
          }
        }
      },
      { passive: false }
      )
    },
    showContent () {
      this.rateoption.showcontent = !this.rateoption.showcontent // 如果勾选过滤 则处理数据
    },
    changeRate (type) {
      if (type === 'all') {
        this.rateoption.changerate = 0
      } else if (type === 'recommand') {
        this.rateoption.changerate = 1
      } else if (type === 'gag') {
        this.rateoption.changerate = 2
      }
    },
    addcart () {
      vue.set(this.food, 'count', 1)
    },
    initSCroll () {
      this.foodScroll = new BScroll(this.$refs.foodWapper, {
        scrollY: true,
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        // console.log(pos)
      })
    },
    show () {
      this.showFlag = true
    }
  },
  created () {
    this.$nextTick(() => { // 初始化滑动组件
      this.initSCroll()
      this.touchstart()
      this.touchend()
    })
  },
  watch: {
    ratings (val) {
      this.selectrating = this.ratings
    },
    rateoption: {
      handler (option) {
        let container = [] // 先处理是否有评论 过滤一遍
        if (option.showcontent) {
          this.ratings.forEach((ele) => {
            if (ele.text) {
              container.push(ele)
            }
          })
        } else {
          container = this.ratings
        }
        let wash1 = container
        let wash2 = []
        let wash3 = []
        container.forEach(ele => {
          if (ele.rateType === 0) {
            wash2.push(ele)
          } else if (ele.rateType === 1) {
            wash3.push(ele)
          }
        })
        if (option.changerate === 0) {
          this.selectrating = wash1
        } else if (option.changerate === 1) {
          this.selectrating = wash2
        } else if (option.changerate === 2) {
          this.selectrating = wash3
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
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
