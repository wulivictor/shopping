<template>
<div class="cartcontroller">
  <div class="food-decrease icon-remove_circle_outline"  v-show="food.count>0" @click.stop="decreaseClick"></div>
  <div class="food-count" v-show="food.count>0"> <!---->
    <input type="number" v-model="food.count">
  </div>
  <div class="food-add icon-add_circle"  @click.stop="addClick"></div>
</div>
</template>

<script type="text/ecmascript-6">
import vue from 'vue'
export default {
  name: 'cartcontroller',
  props: {
    food: {
      Type: Object
    }
  },
  created () {
  },
  methods: {
    addClick () {
      if (!this.food.count) {
        vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseClick () {
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "cartcontroller.styl"
</style>
