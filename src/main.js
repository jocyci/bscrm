import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/common/css/common.css'
import '@/common/css/style.css'
import { initApisToken } from '@/common/js/apis'
import global from '@/common/js/global'
import Util from '@/common/util'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(global)

router.beforeEach((to, from, next) => {
  let token = Util.getCookie('token')
  if (token) {
    initApisToken(`JWT ${token}`)
  }
  if (token && to.path === '/login') {
    next({path: '/', replace: true})
  } else if (!token && to.path !== '/login') {
    next({path: '/login', replace: true})
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
