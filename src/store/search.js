//搜索页数据
import { search } from '@/api'
import { searchHotDetail } from '@/api'

export default {
    namespaced: true,
    actions: {
        sendSearchHotDetail(context) {//发送请求，获取热搜榜
            searchHotDetail().then(res => {
                context.commit('updateSearchHotDetail', res.data.data)
            })
        },
        sendSearch(context, { keywords = '', limit = 30, offset = 0 }) {//发送请求，获取搜索结果
            if (!keywords) return 0
            context.state.isInSearch=true
            search({ keywords, limit, offset: offset * 30 }).then(res => {
                context.commit(offset ? 'addSearchResult' : 'updateSearchResult', res.data.result.songs)
                context.state.isInSearch=false
            }).catch(()=>{
                context.state.isInSearch=false
            })
        },
        clearSearchResult(context) {//清空搜索结果
            context.commit('updateSearchResult', [])
        },
        getSearchInputValue(context, value) {//获取搜索框的值
            context.commit('setSearchInputValue', value)
        }
    },
    mutations: {
        updateSearchHotDetail(state, value) {
            state.searchHotDetail = value
        },
        updateSearchResult(state, value) {//更新搜索结果的数据
            state.searchResult = value
        },
        addSearchResult(state, value) {//往搜索结果添加数据
            if (!value) return 0;
            state.searchResult.push(...value)
        },
        setSearchInputValue(state, value) {//设置搜索框的值
            state.searchInputValue = value
        }
    },
    state: {
        searchHotDetail: [],
        searchResult: [],
        searchInputValue: '',//搜索框的值，通过action与页面的搜索框的值绑定
        isInSearch: false//判断是否在搜索
    }
}