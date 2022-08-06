<template>
  <view class="app-loading" :style="'--size:'+size">
    <view class="ul">
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
      <view class="li"></view>
    </view>
  </view>
</template>
<script>
export default {
  name: "AppLoading",
  props:{
    size:{//loading图标大小
      default:"20px"
    }
  }
};
</script>
<style lang="scss">
.app-loading {
  .ul {
    margin: auto;
    width: var(--size);
    height: var(--size);
    display: flex;
    justify-content: space-between;
    @keyframes li-frames {
      0% {
        transform: scaleY(1);
      }
      25% {
        transform: scaleY(.5);
      }
      50% {
        transform: scaleY(1);
      }
      75%{
        transform: scaleY(.5);
      }
    }
    .li {
      height: 100%;
      width: 10%;
      background-color: red;
      animation-name: li-frames;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      transform-origin: 0 100%;
      &:nth-child(odd) {
        animation-direction: reverse;
      }
    }
  }
}
</style>