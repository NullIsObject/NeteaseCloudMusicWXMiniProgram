<template>
  <view class="player-page">
    <AppHeader :isShowBtnBox="true"><text class="title">歌名</text></AppHeader>
    <view class="main">
      <PlayerArea />
      <RecommendArea/>
      <CommentArea/>
      <view class="download-app">
        下载云音乐查看跟多精彩内容
      </view>
    </view>
  </view>
</template>
<script>
import PlayerArea from "./components/PlayerArea/PlayerArea";
import RecommendArea from "./components/RecommendArea/RecommendArea.vue";
import CommentArea from "./components/CommentArea/CommentArea.vue";
export default {
  name: "PlayerPage",
  components: { PlayerArea, RecommendArea, CommentArea },
};
</script>
<style lang="scss">
.player-page {
  background-color: black;
  backdrop-filter: blur(.5);
  padding-bottom: 50px;
  .title {
    color: white;
  }
  .main {
    width: $body-width;
    margin: auto;
  }
  .download-app{
    color: white;
    background-color: rgba(255,255,255,.2);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    border-radius: 2.5em;
    margin-top: 20px;
  }
}
</style>