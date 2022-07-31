<template>
  <view class="recommend-area">
    <view class="title">
      <text class="text">喜欢这首哥的人也听</text>
      <view class="play-all">
        <text class="iconfont icon-play-all"></text>
        一键收听
      </view>
    </view>
    <view class="main">
        <view class="item">
            <view class="head"></view>
            <view class="music-title">
                <text>歌名</text>
                <text>歌手</text>
            </view>
            <view class="btn iconfont icon-play-that"></view>
        </view>
        <view class="item">
            <view class="head"></view>
            <view class="music-title">
                <text>歌名</text>
                <text>歌手</text>
            </view>
            <view class="btn iconfont icon-play-that"></view>
        </view>
        <view class="item">
            <view class="head"></view>
            <view class="music-title">
                <text>歌名</text>
                <text>歌手</text>
            </view>
            <view class="btn iconfont icon-play-that"></view>
        </view>
        <view class="item">
            <view class="head"></view>
            <view class="music-title">
                <text>歌名</text>
                <text>歌手</text>
            </view>
            <view class="btn iconfont icon-play-that"></view>
        </view>
        <view class="item">
            <view class="head"></view>
            <view class="music-title">
                <text>歌名</text>
                <text>歌手</text>
            </view>
            <view class="btn iconfont icon-play-that"></view>
        </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "RecommendArea",
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
      border: 1px solid rgba(255,255,255,.5);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2em;
      padding: 0 1em;
    }
  }
  .main{
    .item{
        margin-top: 20px;
        height: 50px;
        display: flex;
        position: relative;
        .head{
            background-color: yellow;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            margin-right: 10px;
        }
        .music-title{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text:last-child{
                font-size:12px;
                opacity: .5;
            }
        }
        .btn{
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            font-size: 35px;
            opacity: .5;
        }
    }
  }
}
</style>