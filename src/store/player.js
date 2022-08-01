//播放器数据
import { songDetail, songUrl, yric } from '@/api'
export default {
    namespaced: true,
    actions: {
        startPlayMusic(context,obj){
            obj.title=obj.title||'未获取标题'
            obj.singer=obj.singer||'暂无'
            obj.coverImgUrl=obj.coverImgUrl||''
            context.commit('startPlayMusic',obj)
        }
    },
    mutations: {
        addMusicFromPlayList(state, idArr) {//接收存放音乐id的数组
            state.playList.push(...idArr)
        },
        startPlayMusic(state,obj) {//接收一个backgroundAudioManager对象
            //#ifdef MP-WEIXIN
            for (let key in obj) {
                state.bgAudioManager[key] = obj[key]
            }
            //#endif
        }
    },
    state: {
        bgAudioManager: uni.getBackgroundAudioManager(),
        playList: [],//播放列表，存放ID
        playingData: {},//播放中的音乐数据
    }
}