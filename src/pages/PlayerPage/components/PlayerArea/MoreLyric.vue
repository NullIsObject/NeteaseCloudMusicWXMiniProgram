<template>
  <view class="more-lyric" v-show="isShowMoreLyric">
    <view class="header">
      <view class="iconfont icon-close" @click="isShowMoreLyric = false"></view>
    </view>
    <scroll-view class="main" scroll-y="true">
      <view class="lyric-box" :style="'--lyricFocus:' + lyricFocus">
        <view
          class="item"
          v-for="(val, index) in thatMusicYric"
          :key="add(val.id, val.value)"
          :class="index == lyricFocus && 'mark'"
          >{{ val.value }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
export default {
  name: "MoreLyric",
  props: ["thatMusicYric", "lyricFocus"],
  data() {
    return {
      isShowMoreLyric: false,
    };
  },
  methods: {
    add(a, b) {
      //兼容小程序
      return a + b;
    },
  },
  created() {
    const that=this
    uni.$on("showMoreLyric", () => {
      that.isShowMoreLyric = true;
    });
  },
};
</script>
<style lang="scss">
.more-lyric {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.8);
  transition: .8s;
  z-index: 1;
  .header {
    height: $wx-header-height;
    .iconfont {
      width: $wx-header-height;
      height: $wx-header-height;
      text-align: center;
      line-height: $wx-header-height;
      float: right;
      font-size: 30px;
    }
  }
  .main {
    height: calc(100vh - $wx-header-height);
    overflow: hidden;
    .lyric-box {
      font-size: 1em;
      text-align: center;
      overflow: hidden;
      .item {
        height: calc(2.2em);
        opacity: 0.5;
        transition: .3s;
      }
      .item.mark {
        opacity: 1;
      }
    }
  }
}
</style>