import Vue from 'vue'
import App from './App'
import router from './router'
import vueresource from 'vue-resource'
import './common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(vueresource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
router.push('/goods')
