// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
import api from './api'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.use(VueRouter)

Vue.prototype.$http = api
Vue.axios = api

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

sync(store, router)

Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
    },
    response: function (res) {
      var headers = this.options.http._getHeaders.call(this, res)
      var token = headers.Authorization || headers.authorization
      token = token || res.data.token
      return token
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {url: '/api/auth/login', method: 'POST', redirect: '/'},
  fetchData: {url: '/api/user/me'},
  refreshData: {enabled: false},
  tokenName: 'token',
  rolesVar: 'role',
  parseUserData: function (data) {
    return data
  }
})

// Check local storage to handle refreshes
if (window.localStorage) {
  var localUserString = window.localStorage.getItem('user') || 'null'
  var localUser = JSON.parse(localUserString)

  if (localUser && store.state.user !== localUser) {
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})
