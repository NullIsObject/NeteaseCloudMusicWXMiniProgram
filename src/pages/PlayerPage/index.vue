<template>
  <view class="body">
    <view
      class="player-page"
      :style="'background-image: url(' + musicData.al.picUrl + ')'"
      v-if="isLoadData"
    >
      <view class="box">
        <AppHeader :isShowBtnBox="true" class="header">
          {{ musicData.name }}
        </AppHeader>
        <scroll-view
          class="scroll-box"
          scroll-y="true"
          lower-threshold="1000"
          @scrolltolower="scrolltolower"
        >
          <view class="main">
            <PlayerArea :musicData="musicData" :pageMusicId="pageMusicId" />
            <RecommendArea :pageMusicId="pageMusicId" />
            <CommentArea
              :commentData="commentData"
              :hasMoreComment="hasMoreComment"
            />
          </view>
        </scroll-view>
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
  data() {
    return {
      pageMusicId: "",
      musicData: {
        name: "",
        al: {
          picUrl: "",
          name: "",
        },
      },
      isLoadData: false, //判断数据是否加载完成
      commentNumberOfPages: 1,
      commentData: [],
      hasMoreComment: true,
    };
  },
  methods: {
    addComment() {
      if (!this.hasMoreComment) return 0;
      this.$api
        .commentHot({
          id: this.pageMusicId,
          tpe: 0,
          limit: 20,
          offset: (this.commentNumberOfPages - 1) * 20,
        })
        .then((res) => {
          this.commentData.push(...res.data.hotComments);
          this.hasMoreComment = res.data.hasMore;
        });
    },
    scrolltolower() {
      this.addComment();
    },
    getAllsinger(arr) {
      //遍历出一个数组所有歌手
      let str = "";
      arr.forEach((val) => {
        str += val.name + " ";
      });
      return str;
    },
  },
  watch: {
    commentData: {
      deep: true,
      handler(val) {
        this.commentNumberOfPages++;
      },
    },
  },
  onLoad({ id }) {
    this.pageMusicId = id;
    //获取音乐数据
    this.$api.songDetail(this.pageMusicId).then((res) => {
      this.musicData = res.data.songs[0];
      this.isLoadData = true;
    });
  },
  onShareAppMessage() {
    return {
      title: this.musicData.name + "-" + this.getAllsinger(this.musicData.ar),
      path: "/pages/PlayerPage/index?id=" + this.musicData.id,
      imageUrl: this.musicData.al.picUrl,
    };
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
  }
}
</style>