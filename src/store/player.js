//播放器数据（这里做整个app的播放器）
import { songUrl } from "@/api"
export default {
    namespaced: true,
    actions: {
        main(context) {//播放器初始化，在main.js调用，不要在其他地方调用
            const state = context.state
            state.bgAudioManager.onPlay(() => {
                state.isPlayingMusic = true
                state.playingMusicId = state.bgAudioManager.musicID
            })
            state.bgAudioManager.onPause(() => {
                state.isPlayingMusic = false
            })
            state.bgAudioManager.onStop(() => {
                state.isPlayingMusic = false
            })
            state.bgAudioManager.onEnded(() => {
                state.isPlayingMusic = false
                if (state.playList.length) {//播放结束时，判断播放列表是否有歌曲
                    context.dispatch('startPlayMusic', state.playList[0]).then(res => {
                        //播放成功，在播放列表中清除已播放音乐数据
                        state.playList.shift()
                    })
                }
            })
        },
        updateMusicFromPlayList(context, musicLists) {//更新播放列表，接收存放音乐数据的数组，不用包含播放路径
            context.dispatch('startPlayMusic', musicLists[0])
            musicLists.shift()
            context.state = []
            context.commit('addMusicFromPlayList', musicLists)
        },
        startPlayMusic(context, obj) {//发送请求获取音乐连接，同时播放音乐，统一在这里请求播放连接
            if (!obj.musicID) throw "请传入musicID"
            obj.title = obj.title || '未获取标题'
            obj.singer = obj.singer || '暂无'
            obj.coverImgUrl = obj.coverImgUrl || ''
            if (!obj.src) {
                return songUrl(obj.musicID).then(res => {
                    obj.src = res.data.data[0].url
                    context.commit('startPlayMusic', obj)
                    return res
                })
            } else return Promise((resolve, reject) => {
                context.commit('startPlayMusic', obj)
                resolve()//如果commit不出错，反回成功Promise
            })
        }
    },
    mutations: {
        addMusicFromPlayList(state, musicLists) {//接收存放音乐数据的数组
            state.playList.push(...musicLists)
        },
        startPlayMusic(state, obj) {//播放音乐，统一在这里进行播放，接收一个backgroundAudioManager对象
            for (let key in obj) {
                state.bgAudioManager[key] = obj[key]
            }
            state.bgAudioManager.play()
        }
    },
    state: {
        //#ifdef MP-WEIXIN
        bgAudioManager: uni.getBackgroundAudioManager(),
        //#endif
        //#ifdef H5
        bgAudioManager: uni.createInnerAudioContext(),
        //#endif
        playList: [],//播放列表，存放音乐数据的对象
        isPlayingMusic: false,//判断音乐是否播放，只在main.js设置
        playingMusicId: 0,//播放中的音乐的ID
    }
}