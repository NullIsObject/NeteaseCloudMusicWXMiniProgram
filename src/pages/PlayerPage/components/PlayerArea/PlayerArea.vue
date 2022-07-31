<template>
  <view class="player-area">
    <view class="title">
      <image src="@/static/logo.png" mode="widthFix" />
      网易云音乐
    </view>
    <view class="img-box">
      <view class="record-box">
        <view class="record">
          <image
            mode="widthFix"
            src="@/static/record.png"
            :style="isPlayMusic || 'animation-play-state: paused'"
          />
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
export default {
  name: "PlayerArea",
  data() {
    return {
      isPlayMusic: false, //判断动画暂停或播放
    };
  },
  watch: {
    isPlayMusic() {
      console.log(1);
    },
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
      .record {
        width: 100%;
        height: 100%;
        position: absolute;
        @keyframes rotate {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }
        image {
          width: 100%;
          animation: rotate 10s linear 0s infinite;
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