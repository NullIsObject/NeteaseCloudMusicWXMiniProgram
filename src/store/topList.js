// 首页数据
import { topList, topListDetail } from '@/api'
export default {
    namespaced: true,
    actions: {
        sendTopListDetail(context, value) {
            return topListDetail().then(res => {
                res.data.list.length = 4//返回的数据只有前四个可用
                context.commit('updateTopListDetail',res.data.list)
                return res
            })
        },
        loaded(context){
            context.state.isLoaded=true
        }
    },
    mutations: {
        updateTopListDetail(state,value) {
            state.topListDetail=value
        }
    },
    getters: {

    },
    state: {
        topListDetail:[],
        isLoaded:false
    }
}