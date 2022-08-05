<template>
  <view class="player-area">
    <view class="title">
      <image src="@/static/logo.png" mode="widthFix" />
      网易云音乐
    </view>
    <view class="img-box">
      <view class="record-box">
        <view
          class="record"
          :style="'transform:rotate(' + recordRotate + 'deg'"
        >
          <image mode="widthFix" src="@/static/record.png" />
          <image mode="widthFIx" :src="musicData.al.picUrl" class="bg-img" />
        </view>
        <view
          class="btn iconfont icon-play-that"
          :class="isPlayMusic ? 'icon-stop' : 'icon-play-that'"
          @click="playOrStopThatMusic"
        ></view>
      </view>
    </view>
    <view class="lyric-box" :style="'--lyricFocus:' + lyricFocus">
      <view
        class="item"
        v-for="(val, index) in thatMusicYric"
        :key="val.id + val.value"
        :class="index == lyricFocus && 'mark'"
        >{{ val.value }}
      </view>
    </view>
    <view class="get-more-lyric">查看更多歌词</view>
    <view class="share-btn">分享给微信好友</view>
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "PlayerArea",
  data() {
    return {
      isPlayMusic: false, //判断音乐暂停或播放
      recordRotate: 0, //.record的旋转角度
      addRecordRotateInterval: 0, //存放.record动画的定时器
      thatMusicYric: [],
      lyricInterval: 0, //存放歌词定时器
      lyricFocus: 0, //判断选中的歌词
    };
  },
  computed: {
    ...mapState("player", ["playingMusicId"]),
  },
  watch: {
    playingMusicId(val) {
      this.isPlayMusic = (val == this.pageMusicId);
    },
    isPlayMusic(val) {
      if (val) {
        //.record的旋转和停止
        this.addRecordRotateInterval = setInterval(() => {
          if (this.recordRotate < 360) this.recordRotate++;
          else this.recordRotate = 0;
        }, 50);
      } else {
        clearInterval(this.addRecordRotateInterval);
      }

      if (val) {
        //歌词的播放与暂停
        clearInterval(this.lyricInterval);
        this.lyricInterval = setInterval(() => {
          if (this.bgAudioManager.paused) this.isPlayMusic = false;
          for (let i = 0; i < this.thatMusicYric.length; i++) {
            if (this.thatMusicYric[i].date >= this.bgAudioManager.currentTime) {
              this.lyricFocus = i - 1;
              break;
            }
          }
        }, 500);
      } else {
        clearInterval(this.lyricInterval);
      }
    },
  },
  methods: {
    lyricDispose(str) {
      //歌词处理
      const arr = str.split("\n");
      for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        arr[i] = {
          id: value.slice(0, value.indexOf("]") + 1),
          value: value.slice(value.indexOf("]") + 1),
        };
        //时间处理
        const musicDate = arr[i].id;
        const min =
          Number.parseInt(
            musicDate.slice(musicDate.indexOf("[") + 1, musicDate.indexOf(":"))
          ) * 60;
        const s = Number.parseFloat(
          musicDate.slice(musicDate.indexOf(":") + 1, musicDate.indexOf("]"))
        );
        arr[i].date = min + s;
      }
      return arr;
    },
    playOrStopThatMusic() {
      //播放当前页面对应的音乐
      if (!this.isPlayMusic) {
        if (this.playingMusicId != this.pageMusicId) {
          this.$store
            .dispatch("player/startPlayMusic", {
              musicID: this.musicData.id,
              title: this.musicData.name,
              coverImgUrl: this.musicData.al.picUrl,
              singer: this.musicData.al.name,
            })
            .then(() => {
              this.isPlayMusic = true;
            });
        } else {
          this.bgAudioManager.play();
          this.isPlayMusic = true;
        }
      } else {
        //停止当前页面对应的音乐
        this.bgAudioManager.pause();
        this.isPlayMusic = false;
      }
    },
  },
  props: {
    musicData: {
      //获取当前页面的数据
      default() {
        return {
          al: {
            picUrl: "",
          },
        };
      },
    },
    pageMusicId: "",
  },
  created() {
    this.$api.yric(this.pageMusicId).then((res) => {
      this.thatMusicYric = this.lyricDispose(res.data.lrc.lyric);
    });
    this.isPlayMusic = (this.playingMusicId == this.pageMusicId);
  },
};
</script>
<style lang="scss">
.player-area {
  color: white;
  font-size: 30rpx;
  .title {
    color: white;
    height: 30px;
    display: flex;
    align-items: center;
    image {
      width: 20px;
      margin-right: 5px;
    }
  }
  .img-box {
    height: 700rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .record-box {
      width: 600rpx;
      height: 600rpx;
      position: relative;
      border-radius: 50%;
      background-color: rgba($color: #fff, $alpha: 0.5);
      overflow: hidden;
      .record {
        width: 100%;
        height: 100%;
        position: absolute;
        image {
          width: 100%;
        }
        .bg-img {
          position: absolute;
          width: calc(100% - 20px);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
      }
      .btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 150rpx;
        color: white;
      }
    }
  }
  .lyric-box {
    font-size: 1em;
    text-align: center;
    height: 6.6em;
    overflow: hidden;
    .item {
      height: calc(2.2em);
      opacity: 0.5;
      &:first-child {
        margin-top: calc(-2.2em * max((var(--lyricFocus) - 1), 0));
      }
    }
    .item.mark {
      opacity: 1;
    }
  }
  .get-more-lyric {
    text-align: center;
    font-size: 1em;
    height: calc(2.2em);
    text-decoration: underline;
  }
  .share-btn {
    border: 1px solid rgba(255, 255, 255, 0.5);
    font-size: 1.1em;
    margin: 2em auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10em;
    height: 2.2em;
    border-radius: 2.2em;
  }
}
</style>