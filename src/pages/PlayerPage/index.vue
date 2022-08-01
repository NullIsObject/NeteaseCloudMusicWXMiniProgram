<template>
  <view
    class="player-page"
    :style="'background-image: url(' + musicData.al.picUrl + ')'"
  >
    <view class="box">
      <AppHeader :isShowBtnBox="true" class="header">
        {{ musicData.name }}
      </AppHeader>
      <scroll-view class="scroll-box" scroll-y="true">
        <view class="main">
          <PlayerArea :musicData="musicData" :pageMusicId="pageMusicId" />
          <RecommendArea :pageMusicId="pageMusicId" />
          <CommentArea :pageMusicId="pageMusicId" />
          <view class="download-app"> 下载云音乐查看跟多精彩内容 </view>
        </view>
      </scroll-view>
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
  data() {
    return {
      pageMusicId: "347230",
      musicData: {
        name:'',
        al: {
          picUrl: '',
          name:''
        },
      },
    };
  },
  methods: {
    playThatMusic() {
      //播放当前音乐
      this.$api.songUrl(this.pageMusicId).then((res) => {
        const src = res.data.data[0].url;
        this.$store.dispatch("player/startPlayMusic", {
          src,
          title:this.musicData.name,
          coverImgUrl:this.musicData.al.picUrl,
          singer:this.musicData.al.name,
        });
      });
    },
  },
  created() {
    //获取音乐数据
    this.$api.songDetail(this.pageMusicId).then((res) => {
      this.musicData = res.data.songs[0];
      this.playThatMusic()
    });
  },
};
</script>
<style lang="scss">
.player-page {
  background-position: top center;
  background-size: auto 100%;
  .box {
    background-color: rgba($color: #000000, $alpha: 0.3);
    backdrop-filter: blur(30px);
  }
  .header {
    color: white;
  }
  .scroll-box {
    height: calc(100vh - $wx-header-height);

    .main {
      width: $body-width;
      margin: auto;
    }
    .download-app {
      color: white;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5em;
      border-radius: 2.5em;
      margin-top: 20px;
    }
  }
}
</style>