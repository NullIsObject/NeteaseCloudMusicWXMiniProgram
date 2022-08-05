<template>
  <view class="song-list-main">
    <view class="play-all">
      <text class="iconfont icon-play-all"></text>
      <text class="text"> 播放全部 </text>
      <text class="span">（共{{musicListLength}}首）</text>
    </view>
    <view class="ol">
      <block v-for="(val,index) in musicList" :key="val.id">
        <view class="li" @click="openThatMusic(val.id)">
          <view class="serial-number">{{index+1}}</view>
          <view class="music-data">
            <view class="music-name">{{val.name}}</view>
            <view class="singer">{{val.ar[0].name}}-{{val.name}}</view>
          </view>
          <view class="iconfont icon-play-that"></view>
        </view>
      </block>
    </view>
  </view>
</template>
<script>
export default {
  name: "SongListMain",
  props: ["musicList","musicListLength"],
  methods:{
    openThatMusic(id){
      uni.navigateTo({
        url:`/pages/PlayerPage/index?id=${id}`
      })
    }
  }
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