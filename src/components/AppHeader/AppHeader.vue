<template>
  <view class="app-header" :style="capsuleStyle">
    <view class="btn-box" v-if="isShowBtnBox">
      <view class="go-back iconfont icon-go-back" @click="goBack"></view>
      <text>|</text>
      <view class="go-home iconfont icon-home" @click="goHome"></view>
    </view>
    <view class="title">
      <slot>网易云音乐</slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    isShowBtnBox: {
      default: false,
    },
  },
  computed: {
    capsuleStyle() {
      //小程序胶囊样式
      //#ifndef H5
      const obj = {};
      const capsule = uni.getMenuButtonBoundingClientRect();
      let res = "";
      for (let key in capsule) {
        obj[`--capsule-${key}`] = capsule[key] + "px";
      }
      for (let key in obj) {
        res += key + ":" + obj[key] + ";";
      }
      return res;
      //#endif
    },
  },
  methods: {
    goHome() {
      //页面直接跳转时，即使目标页面已存在，仍然会打开新页面，所以这里不能直接跳转
      const currentPages = getCurrentPages();
      let i = 0; //用来获取第一个home页面在页面栈中的位置
      const bool = currentPages.some((val) => {
        i++; //索引从1开始
        return val.route == "pages/AppHome/index";
      });
      if (bool)
        //页面栈存在home，返回到home页面
        uni.navigateBack({
          delta: currentPages.length - i,
        });
      //页面栈不存在home，直接跳转，同时关闭该页面
      else
        uni.redirectTo({
          url: "/pages/AppHome/index",
        });
    },
    goBack() {
      const currentPages = getCurrentPages();
      if (currentPages.length == 1) {//判断页面栈中是否存在可以返回的页面
        this.goHome();
      } else {
        uni.navigateBack();
      }
    },
  },
};
</script>

<style lang="scss">
.app-header {
  height: $wx-header-height;
  position: relative;
  // background: linear-gradient(
  //   0,
  //   rgba(255, 255, 255, 0) 50%,
  //   rgba(255, 255, 255, 0.4)
  // );
  --capsule-width: 100px;
  --capsule-height: 25px;
  --capsule-top: 35px;

  .btn-box {
    background-color: $wx-capsule-color;
    box-shadow: 0 0 1px 1px $wx-capsule-color;
    position: absolute;
    display: flex;
    color: white;
    width: var(--capsule-width);
    height: var(--capsule-height);
    border-radius: var(--capsule-height);
    top: var(--capsule-top);
    left: calc(750rpx - var(--capsule-right));
    right: calc(100vw - var(--capsule-width) - 20rpx);
    z-index: 1;

    view {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: calc(var(--capsule-height) / 1.5);
    }

    text {
      font-size: calc(var(--capsule-height) / 2);
      line-height: var(--capsule-height);
      font-weight: lighter;
      opacity: $wx-capsule-opacity;
    }
  }

  .title {
    font-size: 35rpx;
    width: 100%;
    position: absolute;
    text-align: center;
    height: var(--capsule-height);
    top: var(--capsule-top);
    line-height: var(--capsule-height);
  }
}
</style>