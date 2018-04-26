<template>
  <div class="header">
    <div class="content-wapper">
      <div class="avatar">
        <img :src=seller.avatar>
      </div>
      <div class="seller-main">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="delivery">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>

        <div v-if="seller.supports" class="support" v-on:click="showDetail">
          <div class="icon" :class=classMap[0]></div>
          <div class="decription">{{seller.supports[0].description}}</div>
          <div class="number">
            <span>
              {{seller.supports.length}}个 <i class="icon-keyboard_arrow_right"></i>
            </span>
          </div>

        </div>
      </div>

    </div>
    <div class="bulutin-wapper" v-on:click="showDetail">
     <span class="bulletin-icon">
     </span>
      <span class="bulletin-text">
        {{seller.bulletin}}
     </span>

      <i class="icon-keyboard_arrow_right"></i>

    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wapper clearfix">
          <div class="detail-main">
            <div class="seller-title">
              <h1 class="title-name"> {{seller.name}}</h1>
              <div class="star">
                <star :size='48' :score=seller.score></star>
              </div>

            </div>
            <div class="discount-msg">
              <div class="msg-title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <div class="msg-main">
                <ul v-if="seller.supports">
                  <li v-for="(support,index) in seller.supports" class="description">
                    <span class="icon" :class=classMap[support.type]></span>
                    <span>{{support.description}}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="notice-msg">
              <div class="notice-title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="notice-main">
                <p class="notice-text">
                  {{seller.bulletin}}
                </p>

              </div>


            </div>
          </div>
        </div>
        <div class="detail-footer">
          <i class="icon-close" v-on:click="detailClose"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star.vue'

export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object
    }
  },
  data () { //  需要添加getter和setter就放在data里面
    return {
      detailShow: false,
      supports: this.seller.supports
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    detailClose () {
      this.detailShow = false
    }
  },
  created () { //  不需要添加getter和setter就放在created里面
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  },
  computed: {}
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "header.styl"
</style>
