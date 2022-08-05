import Vue from 'vue'
import store from '@/store/index.js'
import * as api from '@/api'

import App from './App'
import AppHeader from '@/components/AppHeader/AppHeader'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$api = api
Vue.component("AppHeader", AppHeader)

const app = new Vue({
  ...App,
  store,
  created() {
    Vue.prototype.bgAudioManager = this.$store.state.player.bgAudioManager
    this.$store.state.player.main()
  }
})
app.$mount()
