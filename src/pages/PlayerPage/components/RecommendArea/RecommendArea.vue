<template>
  <view class="recommend-area">
    <view class="title">
      <text class="text">喜欢这首哥的人也听</text>
      <view class="play-all" @click="playAllMusic">
        <text class="iconfont icon-play-that" style="margin-right: 2px"></text>
        一键收听
      </view>
    </view>
    <view class="main">
      <view
        class="item"
        v-for="val in musicListData"
        :key="val.id"
        @click="openThatMusic(val.id)"
      >
        <view class="head">
          <image
            class="head-photo"
            :src="val.album.blurPicUrl"
            mode="widthFix"
          />
        </view>
        <view class="music-title">
          <text class="tag-text">{{ val.name }}</text>
          <text class="tag-text">
            <text v-for="valVal in val.artists" :key="valVal.id"
              >{{ valVal.name }}
            </text>
            <text>{{ " - " }}</text>
            <text>{{ val.album.name }}</text>
          </text>
        </view>
        <view
          class="btn iconfont"
          :class="
            playingMusicId == val.id && isPlayingMusic
              ? 'icon-stop'
              : 'icon-play-that'
          "
          @click.stop="playThatMusic(val)"
        ></view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "RecommendArea",
  props: ["pageMusicId"],
  data() {
    return {
      musicListData: [],
    };
  },
  computed: {
    ...mapState("player", ["isPlayingMusic", "playingMusicId"]),
  },
  methods: {
    openThatMusic(id) {
      uni.navigateTo({
        url: `/pages/PlayerPage/index?id=${id}`,
      });
    },
    playThatMusic(obj) {
      //播放点击的歌曲
      if (this.bgAudioManager.musicID == obj.id) {
        if (!this.bgAudioManager.paused) this.bgAudioManager.pause();
        else this.bgAudioManager.play();
        return 0;
      }
      this.$store.dispatch("player/startPlayMusic", {
        musicID: obj.id,
        title: obj.name,
        singer: (() => {
          const singerArr = obj.artists;
          const singerNames = [];
          for (let i = 0; i < singerArr.length; i++) {
            singerNames.push(singerArr[i].name);
          }
          return singerNames;
        })(),
        coverImgUrl: obj.album.blurPicUrl,
      });
    },
    playAllMusic() {
      //一键播放
      const musicList = [];//遍历出音乐数据
      this.musicListData.forEach((val) => {
        musicList.push({
          musicID: val.id,
          title: val.name,
          singer: (() => {
            const singerArr = val.artists;
            const singerNames = [];
            for (let i = 0; i < singerArr.length; i++) {
              singerNames.push(singerArr[i].name);
            }
            return singerNames.join("");
          })(),
          coverImgUrl: val.album.blurPicUrl,
        });
      });
      this.$store.dispatch("player/updateMusicFromPlayList", musicList);
    },
  },
  created() {
    this.$api.simiSong(this.pageMusicId).then((res) => {
      this.musicListData = res.data.songs;
    });
  },
};
</script>
<style lang="scss">
.recommend-area {
  color: white;
  font-size: 30rpx;
  .title {
    height: 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size: 1.2em;
    }
    .play-all {
      font-size: 12px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2em;
      padding: 0 1em;
    }
  }
  .main {
    .item {
      margin-top: 20px;
      height: 50px;
      display: flex;
      position: relative;
      .head {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 10px;
        overflow: hidden;
        .head-photo {
          width: 100%;
        }
      }
      .music-title {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .tag-text:last-child {
          font-size: 12px;
          opacity: 0.5;
          width: 300rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .btn {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 35px;
        opacity: 0.5;
      }
    }
  }
}
</style>