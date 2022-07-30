import { topList, topListDetail } from '@/api'
export default {
    namespaced: true,
    actions: {
        sendTopListDetail(context, value) {
            topListDetail().then(res => {
                res.data.list.length = 4//返回的数据只有前四个可用
                context.commit('updateTopListDetail',res.data.list)
            })
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
        topListDetail:[]
    }
}