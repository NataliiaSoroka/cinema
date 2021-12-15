import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Include plugins
import '@/plugins/vue-axios'
import '@/plugins/toast'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  comments: { App },
  render: h => h(App),
})
