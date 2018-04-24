<template>
 <div class="header" >
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

        <div v-if="seller.supports" class="support"  v-on:click="showDetail">
          <div class="icon" :class=classMap[0]></div>
          <div class="decription">{{seller.supports[0].description}}</div>
          <div class="number">{{seller.supports.length}}个 <i class="icon-keyboard_arrow_right"></i></div>

        </div>
      </div>


   </div>
   <div class="bulutin-wapper">
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
   <div class="detail" v-show="detailShow">
     <div class="detail-wapper clearfix">
       <div class="detail-main">
          <div class="seller-title">
            <div class="title-name"><p>{{seller.name}}</p></div>
            <div class="star"></div>
          </div>











       </div>
     </div>
     <div class="detail-footer">
        <i class="icon-close" v-on:click="detailClose"></i>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default{
  name: 'v-header',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
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
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
  .header
    color #FFFFFF
    background rgba(7,17,27,0.5)
    overflow hidden
    /*filter blur(10px)*/
    /*width 100%*/
    /*height 136px*/
    /*blur 10px*/
    position relative
    .content-wapper
      position relative
      /*blur 10px*/
      height 106px
      padding 0 12px 0 24px
      font-size 0
      .avatar
        display inline-block
        width 64px
        height 64px
        img
          height 64px
          width 64px
      .seller-main
        margin-top 24px
        margin-bottom 18px
        display inline-block
        margin-left 16px
        .title
          .brand
            bg-image(brand)
            display inline-block
            width 30px
            height 18px
            background-size 30px 18px
            margin-right 6px
            vertical-align top

          .name
            display inline-block
            font-size 16px
            font-weight bold
            line-height 18px
        .delivery
          font-size: 16px
          color:#FFFFFF
          font-weight 200
          line-height: 12px
          margin-top 8px
        .support
          .icon
            width 12px
            height 12px
            background-size 12px 12px
            display inline-block
            position relative
            top 1px

            //通过不同的class渲染不同的额图标
            &.guarantee
              bg-image(guarantee_1)
            &.decrease
              bg-image(decrease_1)
            &.discount
              bg-image(discount_1)
            &.invoice
              bg-image(invoice_1)
            &.special
              bg-image(special_1)

          .decription
            display inline-block
            margin-top 10px
            margin-left 4px
            margin-bottom 2px
            font-size 10px
            line-height 12px
            font-weight 200
            color #FFFFFF

      .number
        position absolute
        font-size 10px
        font-weight 200
        line-height 24px
        color: #FFFFFF
        height 24px
        width 50px
        border-radius:12px;
        bottom 18px
        right 12px
        text-align center
        vertical-align middle
        background rgba(0,0,0,0.2)
        .icon-keyboard_arrow_right
          font-size 10px
    .bulutin-wapper
      position relative
      height 28px
      text-overflow:ellipsis
      white-space:nowrap
      overflow:hidden
      line-height 28px
      font-size 10px
      padding 0 22px 0 12px
      background rgba(7,17,27,0.2)

      .bulletin-icon
        bg-image(bulletin)
        display inline-block
        width 22px
        height 12px
        background-size 22px 12px
        background-repeat no-repeat
        margin 8px 0 5px 0
        vertical-align top
      .icon-keyboard_arrow_right
        position absolute
        right: 12px;
        bottom: 7px;

    .background
      position absolute
      top: 0
      left: 0
      width 100%
      height 100%
      z-index -1
      img
        width 100%
        height 100%
        background-size contain
        filter blur(10px)


    .detail
      position fixed
      width 100%
      height 100%
      z-index 100
      overflow auto
      background black//rgba(7,17,27,0.2)
      top: 0
      left: 0
      .detail-wapper
        min-height 100%
        width 100%
        .detail-main
          padding 64px 36px
          .title-name
            font-size: 16px
            font-weight 700
            color: rgb(255,255,255)
            line-height 16px
            text-align center
            p
              font-size: 16px;
              font-weight: 700;
            .star
              height 24px
              margin-top 16px
      .detail-footer
        position relative
        height 64px
        width 100%
        margin-top: -64px;
        margin-left auto
        margin-right auto
        text-align center

        i
          display block
          font-size 32px
          color rgba(255,255,255,0.5)

</style>
