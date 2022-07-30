import Vue from "vue"
import VueX from 'vuex'

import topList from './topList'
import search from './search'

Vue.use(VueX)

export default new VueX.Store({
    modules: {
        topList,
        search
    }
})