<template>
  <div class="star" :class="starSize">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="staritem">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: { //
    starSize () {
      console.log('star-' + this.size)
      return 'star-' + this.size
    },
    itemClasses () {
      // debugger
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hashalf = (score % 1 !== 0)
      let integer = Math.floor(score)

      // 设置星星数组
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hashalf) {
        result.push(CLS_HALF)
      }
      if (result.length !== LENGTH) {
        for (let i = 0; i < (LENGTH - result.length); i++) {
          result.push(CLS_OFF)
        }
      }
//      console.log(result)
      return result
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
  .star
    font-size 0
    background-repeat no-repeat
    &.star-24
      .staritem
        width 10px
        height 10px
        background-size 10px 10px
        display inline-block
        margin-right 3px
        &:last-child
          margin-right 0
      .on
        bg-image('star24_on')
      .half
        bg-image('star24_half')
      .off
        bg-image('star24_off')

    &.star-36
      .staritem
        width 15px
        height 15px
        background-size 15px 15px
        display inline-block
        margin-right 6px
        &:last-child
          margin-right 0
      .on
        bg-image('star36_on')
      .half
        bg-image('star36_half')
      .off
        bg-image('star36_off')

    &.star-48
      .staritem
        width 20px
        height 20px
        background-size 20px 20px
        display inline-block
        margin-right 22px
        &:last-child
          margin-right 0
      .on
        bg-image('star48_on')
      .half
        bg-image('star48_half')
      .off
        bg-image('star48_off')

</style>
