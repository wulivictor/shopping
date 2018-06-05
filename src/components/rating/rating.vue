<template>
  <div class="rating">{{seller}}</div>
</template>

<script type="text/ecmascript-6">
import shopcart from '../../components/shopcart/shopcart.vue'
export default {
  name: 'rating',
  data () {
    return {

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
    shopcart
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
