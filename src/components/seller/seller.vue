<template>
<div class="seller" ref="sellWapper">
  <div class="seller-content">
    <div class="header">
      <div class="notices">
        <div class="notice">
          <div class="header-left">
            <div class="name">{{seller.name}}</div>
            <div class="star">
              <star class="star" :size='36' :score=seller.score></star>
              <div class="sell-count">月售{{seller.sellCount}}单</div>
            </div>
          </div>
          <div class="header-right">
            <i class="icon-favorite"></i>
            <div class="collect">
              <span class="collect-text">已收藏</span>
            </div>
          </div>
        </div>
      </div>
      <div class="seller-extra">
        <div class="minPrice">
          <div class="title">起送价</div>
          <div class="content">{{seller.minPrice}}<span class="small">元</span></div>
        </div>
        <div class="deliveryPrice">
          <div class="title">商家配送</div>
          <div class="content">{{seller.deliveryPrice}}<span class="small">元</span></div>
        </div>
        <div class="deliveryTime">
          <div class="title">平均配送时间</div>
          <div class="content">{{seller.deliveryTime}}<span class="small">分钟</span></div>
        </div>
      </div>
    </div>
    <div class="special">
      <div class="bulletin">
        <div class="title">
          公告与活动
        </div>
        <div class="content">
          {{seller.bulletin}}
        </div>
      </div>
      <div class="supports">
        <ul>
          <li v-for="(item,index) in seller.supports" v-bind:key="index">
            <div class="logo"><i class="icon" :class="classMap[item.type]"></i></div>
            <div class="description">{{item.description}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="picture">
      <div class="title">商家实景</div>
      <div class="content">
        <ul>
          <li v-for="(picitem,index) in seller.pics" v-bind:key="index">
            <img :src="picitem">
          </li>
        </ul>
      </div>
    </div>
    <div class="information">
      <div class="title">商家信息</div>
      <div class="content">
        <ul>
          <li v-for="(info,index) in seller.infos" v-bind:key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
import star from '../../components/star/star.vue'
export default {
  name: 'seller',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$nextTick(() => {
      // this._initScroll()
    })
  },
  methods: {
    // _initScroll () {
    //   let sellerScroll = new BScroll(this.$refs.sellWapper, {
    //     click: true
    //   })
    // }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "seller.styl"
</style>
