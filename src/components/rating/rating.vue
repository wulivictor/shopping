<template>
<div class="rating">
  <div class="rating-content" ref="rateWapper">
    <div class="overview">
      <div class="overview-left">
        <p class="score-number">{{seller.score}}</p>
        <p class="score-title">综合评分</p>
        <p class="over">高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="overview-right">
        <div class="food-score">
          <div class="text">服务态度</div>
          <star class="star" :size='36' :score=seller.serviceScore></star>
          <div class="number">{{seller.serviceScore}}</div>
        </div>
        <div class="service-score">
          <div class="text">食物评分</div>
          <star class="star" :size='36' :score=seller.foodScore></star>
          <div class="number">{{seller.serviceScore}}</div>
        </div>
        <div class="deliverytime">
          <div class="text">送达时间</div>
          <div class="time">{{seller.deliveryTime}}分钟</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 评论区域  -->
  <div class="food-rating">
    <div class="header">
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
      <li class="rate-item" v-for="(rate, index) in rating" v-bind:key="index">
        <div class="rate-msg">
          <div class="person-img" v-bind:style="{backgroundImage : 'url('+rate.avatar +')'}"></div>
          <div class="person-msg">
            <div class="person-name">{{rate.username}}</div>
            <div class="rate-extra">
              <star class="star" :size='36' :score=rate.score></star>
              <div class="delivery-time" v-show="rate.deliveryTime!=''">{{rate.deliveryTime}}分钟送达</div>
            </div>
          </div>
          <div class="rate-time">{{rate.rateTime | formatDate}}</div>
        </div>
        <div class="rate-content">
          {{rate.text}}
        </div>
        <div class="rate-command" v-show="rate.recommend[0]!=''">
          <ul>
            <i v-bind:class="[rate.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down']"></i>
            <li v-for="(rec,index) in rate.recommend" v-bind:key="index" class="command-item">
              {{rec}}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
import {formatDate} from '../../common/js/date'
import shopcart from '../../components/shopcart/shopcart.vue'
import star from '../../components/star/star.vue'
import BScroll from 'better-scroll'
const ERRNO = 0
export default {
  name: 'rating',
  data () {
    return {
      rating: [],
      selectrating: [],
      rateoption: {
        showcontent: false,
        changerate: 0 /* 0是all 1是recommand 2是gag */
      }
    }
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    shopcart,
    star
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
    this.$http.get('api/ratings').then((request) => {
      request = request.data
      if (request.errno === ERRNO) {
        this.rating = request.data
      }
    })
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    changeRate (type) {
      if (type === 'all') {
        this.rateoption.changerate = 0
      } else if (type === 'recommand') {
        this.rateoption.changerate = 1
      } else if (type === 'gag') {
        this.rateoption.changerate = 2
      }
    },
    _initScroll () {
      this.rateScroll = new BScroll(this.$refs.rateWapper, {
        click: true
      })
    },
    showContent () {
      this.rateoption.showcontent = !this.rateoption.showcontent // 如果勾选过滤 则处理数据
    }
  },
  watch: {
    ratings (val) {
      this.selectrating = this.ratings
    },
    rateoption: {
      handler (option) {
        let container = [] // 先处理是否有评论 过滤一遍
        if (option.showcontent) {
          this.rating.forEach((ele) => {
            if (ele.text) {
              container.push(ele)
            }
          })
        } else {
          container = this.rating
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
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "rating.styl"
</style>
