<template>

<img :src=seller.avatar>

</template>

<script type="text/ecmascript-6">
export default {
  name: 'seller',
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
