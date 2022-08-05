<template>
  <view class="song-list-main">
    <view class="play-all">
      <text class="iconfont icon-play-all" @click="playAllMusic"></text>
      <text class="text"> 播放全部 </text>
      <text class="span">（共{{ allMusicList.length }}首）</text>
    </view>
    <view class="ol">
      <block v-for="(val, index) in musicList" :key="val.id">
        <view class="li" @click="openThatMusic(val.id)">
          <view class="serial-number">{{ index + 1 }}</view>
          <view class="music-data">
            <view class="music-name">{{ val.name }}</view>
            <view class="singer">
              <text v-for="(valVal, index) in val.ar" :key="valVal.id"
                >{{ valVal.name }}
                <text v-if="index + 1 < valVal.length">/</text>
              </text>
              <text>{{ " - " }}</text>
              <text>{{ val.al.name }}</text>
            </view>
          </view>
          <view
            class="iconfont"
            :class="
              playingMusicId == val.id && isPlayingMusic
                ? 'icon-stop'
                : 'icon-play-that'
            "
            @click.stop="playOrStopThatMusic(val.id)"
          ></view>
        </view>
      </block>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "SongListMain",
  props: ["musicList", "allMusicList"],
  methods: {
    openThatMusic(id) {
      uni.navigateTo({
        url: `/pages/PlayerPage/index?id=${id}`,
      });
    },
    playOrStopThatMusic(id) {
      if (this.playingMusicId == id) {
        if (this.$bgAudioManager.paused) this.$bgAudioManager.play();
        else this.$bgAudioManager.pause();
      } else {
        this.musicList.some((val) => {
          if (val.id == id) {
            this.$store.dispatch("player/startPlayMusic", {
              musicID: val.id,
              title: val.name,
              coverImgUrl: val.al.picUrl,
              singer: val.ar[0].name,
            });
            return true;
          }
        });
      }
    },
    playAllMusic() {
      const musicDataArr = [];
      console.log(this.allMusicList[3]);
      this.allMusicList.forEach((val) => {
        musicDataArr.push({
          musicID: val.id,
          title: val.name,
          singer: val.ar[0].name,
          coverImgUrl: val.al.picUrl,
        });
      });
      this.$store.dispatch("player/updateMusicFromPlayList", musicDataArr);
    },
  },
  computed: {
    ...mapState("player", ["playingMusicId", "isPlayingMusic"]),
  },
};
</script>
<style lang="scss">
.song-list-main {
  width: 100%;
  background-color: #fff;
  border-radius: 25px;
  padding: 30rpx;
  font-size: 30rpx;

  .play-all {
    font-size: 1.1em;
    margin-bottom: 60rpx;

    .iconfont {
      font-size: 1.1em;
      margin-right: 25rpx;
    }

    .span {
      font-size: 0.7em;
      opacity: 0.5;
    }
  }

  .ol {
    .li {
      display: flex;
      height: 150rpx;
      align-items: center;
      position: relative;

      .serial-number {
        color: #666;
        font-size: 1.1em;
        margin-right: 30rpx;
        display: flex;
        align-items: center;
      }

      .music-data {
        .music-name {
          font-size: 1.1em;
        }

        .singer {
          font-size: 0.7em;
          color: #666;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .iconfont {
        position: absolute;
        right: 0;
        font-size: 2.5em;
        opacity: 0.2;
      }
    }
  }
}
</style>