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
          @click="isPlayMusic = !isPlayMusic"
        ></view>
      </view>
    </view>
    <view class="lyric-box">
      <view class="item">编曲</view>
      <view class="item mark">制作人</view>
      <view class="item">歌词</view>
      <view class="item">歌词</view>
    </view>
    <view class="get-more-lyric">查看更多歌词</view>
    <view class="share-btn">分享给微信好友</view>
  </view>
</template>
<script>
import mixin from "../mixin.js";
export default {
  name: "PlayerArea",
  mixins: [mixin],
  data() {
    return {
      isPlayMusic: false, //判断动画暂停或播放
      recordRotate: 0, //.record的旋转角度
      addRecordRotateInterval: 0, //存放.record动画的定时器
    };
  },
  watch: {
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

      //音乐的播放和暂停
      const bgAudioManager = uni.getBackgroundAudioManager();
      if (val)
        bgAudioManager.musicID == this.musicData.id
          ? bgAudioManager.play()
          : this.playThatMusic();
      else bgAudioManager.pause();
    },
  },
  computed: {},
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