<template>
 <div class="header">
   <div class="content-wapper" style="background-image: url('seller')">
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

        <div v-if="seller.supports" class="support">
          <div class="icon" :class=classMap[0]></div>
          <div class="decription">{{seller.supports[0].description}}</div>

        </div>
      </div>

     <div class="number">{{seller.supports.length}}个 <i class="icon-keyboard_arrow_right"></i></div>

   </div>
   <div class="bulutin-wapper">
     <i class="bulletin-icon">
     </i>
     <span class="bulletin">
        {{seller.bulletin}}
     </span>
     <i class="icon-keyboard_arrow_right"></i>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object
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
    background yellow
    width 100%
    height 136px
    .content-wapper
      position relative
      background rgba(7,17,27,0.5)
      blur 10px
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
        float right
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
      width 100%
      height 28px
      text-overflow:ellipsis
      white-space:nowrap
      overflow:hidden
      line-height 28px
      font-size 0


      .bulletin-icon
        bg-image(bulletin)
        display inline-block
        width 22px
        height 12px
        background-size 22px 12px
        background-repeat no-repeat
        margin 7px 4px 5px 12px
        vertical-align top

      .bulletin
        font-size 10px
        color: #ffffff
        height 28px
        padding 0 4px
      .icon-keyboard_arrow_right
        font-size 10px
</style>
