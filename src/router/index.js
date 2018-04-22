import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods'
import rating from 'components/rating/rating'
import seller from 'components/seller/seller'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/rating',
      name: 'rating',
      component: rating
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
}
)
