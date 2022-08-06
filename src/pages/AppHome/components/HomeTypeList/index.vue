<template>
  <view class="home-type-list" @click="goToURL">
    <view class="header">
      <image class="tag-image" :src="data.coverImgUrl" />
      <text class="update-date">{{ data.updateFrequency }}</text>
    </view>
    <view class="music">
      <view class="music-list" v-for="(val,index) in data.tracks" :key="val.first">
        {{index+1}}.{{ data.tracks[index].first + " - " + data.tracks[index].second }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "HomeTypeList",
  props: ["data"],
  methods: {
    goToURL() {
      uni.navigateTo({
        url:`/pages/SongList/index?id=${this.data.id}`
      })
    },
  },
};
</script>

<style lang="scss">
.home-type-list {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  padding-top: 15px;

  .header {
    position: relative;
    width: calc($body-width / 3.5);
    height:calc( $body-width / 3.5);
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    overflow: hidden;

    .tag-image {
      width: 100%;
      height: 100%;
    }

    .update-date {
      font-size: 20rpx;
      position: absolute;
      bottom: 5px;
      left: 5px;
    }
  }

  .music {
    width: calc($body-width * 2 / 3);
    height: calc($body-width / 3.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 20rpx;
    opacity: 0.8;
    font-size: 0.8em;

    .music-list {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>