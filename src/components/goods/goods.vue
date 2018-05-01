<template>
<div class="goods">
  <div class="menu-wapper">
    <ul v-show="goods">
      <li v-for="(item,index) in goods" class="meun-option">
          <span class="option-content"><span class="icon" v-show="item.type>0" :class=classMap[item.type]></span>
           {{item.name}}</span>
      </li>
    </ul>
  </div>
  <div class="goods-wapper">
    <ul>
      <li  v-for="item in goods" class="food-list">
        <h1>{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item">
            <div class="food-icon">
              <img :src="food.icon">
            </div>
            <div class="food-content">
              <h1>{{food.name}}</h1>

            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
const ERRNO = 0
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    // 定义icon种类
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // goods数据
    this.$http.get('api/goods').then((response) => {
      response = response.data
      if (response.errno === ERRNO) {
        this.goods = response.data
        console.log(this.goods)
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "good.styl"

</style>
