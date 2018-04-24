<template>
  <div class="star" :class="starSize">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="staritem"></span>

  </div>
</template>

<script type="text/ecmascript-6">
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
  computer: {
    starSize () {
      return 'stat-' + this.size
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
      width 20px
      height 20px
      background-size 20px 20px
      .staritem
        display inline-block
        margin-right 22px
        &:last-child
          margin-right 0
      .on
        bg-image('star24_on')
      .half
        bg-image('star24_half')
      .off
        bg-image('star24_off')
    &.star-36
      width 30px
      height 30px
      background-size 30px 30px
      .staritem
        display inline-block
        margin-right 22px
        &:last-child
          margin-right 0
      .on
        bg-image('star36_on')
      .half
        bg-image('star36_half')
      .off
        bg-image('star36_off')

    &.star-48
      width 60px
      height 60px
      background-size 60px 60px
      .staritem
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
