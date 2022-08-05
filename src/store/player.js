//播放器数据
import { songUrl } from "@/api"
export default {
    namespaced: true,
    actions: {
        updateMusicFromPlayList(context, musicLists) {//接收存放音乐数据的数组，不用包含播放路径
            context.dispatch('startPlayMusic', musicLists[0])
            musicLists.shift()
            context.state=[]
            context.commit('addMusicFromPlayList', musicLists)
        },
        startPlayMusic(context, obj) {
            if (!obj.musicID) throw "请传入musicID"
            obj.title = obj.title || '未获取标题'
            obj.singer = obj.singer || '暂无'
            obj.coverImgUrl = obj.coverImgUrl || ''
            if (!obj.src) {
                songUrl(obj.musicID).then(res => {
                    obj.src = res.data.data[0].url
                    context.commit('startPlayMusic', obj)
                })
            } else
                context.commit('startPlayMusic', obj)
        }
    },
    mutations: {
        addMusicFromPlayList(state, musicLists) {//接收存放音乐数据的数组
            state.playList.push(...musicLists)
        },
        startPlayMusic(state, obj) {//接收一个backgroundAudioManager对象
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
        playingMusicId:0,//播放中的音乐的ID
        main() {//在main.js调用
            this.bgAudioManager.playbackRate=2
            this.bgAudioManager.onPlay(() => {
                this.isPlayingMusic = true
                this.playingMusicId=this.bgAudioManager.musicID
            })
            this.bgAudioManager.onPause(() => {
                this.isPlayingMusic = false
            })
            this.bgAudioManager.onStop(() => {
                this.isPlayingMusic = false
            })
            this.bgAudioManager.onEnded(() => {
                this.isPlayingMusic = false
                if (this.playList.length) {
                    songUrl(this.playList[0].musicID).then(res => {
                        const data = res.data.data[0]
                        this.bgAudioManager.musicID = data.id
                        this.bgAudioManager.src = data.url
                        this.bgAudioManager.singer = this.playList[0].singer
                        this.bgAudioManager.title = this.playList[0].title
                        this.bgAudioManager.coverImgUrl = this.playList[0].coverImgUrl
                    }).then(() => {
                        this.bgAudioManager.play()
                        this.playList.shift()
                    })
                }
            })
        }
    }
}