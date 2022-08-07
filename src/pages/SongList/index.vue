<template>
  <view class="song-list" :style="'--bgcolor:' + bgcolor">
    <view class="box">
      <view class="loading" v-if="!isLoded">
        <AppLoading size="50px" />
      </view>
      <SongListHeader />
      <scroll-view class="main" scroll-y="true" @scrolltolower="loadMore">
        <SongListCover :pageData="pageData"></SongListCover>
        <SongListMain
          :musicList="musicList"
          :allMusicList="musicListData"
        ></SongListMain>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import SongListHeader from "./components/SongListHeader/index.vue";
import SongListCover from "./components/SongListCover/index.vue";
import SongListMain from "./components/SongListMain/index.vue";

export default {
  name: "SongList",
  components: { SongListHeader, SongListCover, SongListMain },
  data() {
    return {
      musicList: [], //页面已渲染音乐列表数据
      musicListData: [], //页面音乐列表数据（未渲染）
      loadDataIndex: 0,
      pageData: {
        //页面数据
        tracks: [],
        name: "",
        coverImgUrl: "",
        description: "",
        playCount: "",
      },
      bgcolor: "white",
      isLoded: false,
    };
  },
  methods: {
    loadMore(event) {
      if (this.musicList.length >= this.musicListData.length) return 0;
      this.musicList.push(
        ...this.musicListData.slice(
          this.loadDataIndex * 10,
          this.loadDataIndex * 10 + 10
        )
      );
    },
    getBgColor() {
      this.bgcolor = `url("${this.pageData.coverImgUrl}")`;
    },
  },
  computed: {
    musicListLength() {
      return this.musicListData.length;
    },
  },
  watch: {
    musicListData(val) {
      this.musicList = val.slice(0, 10);
    },
    musicList() {
      this.loadDataIndex++;
    },
  },
  onLoad(data) {
    this.$api.playlistDetail(data.id).then((res) => {
      this.pageData = res.data.playlist;
      this.musicListData = this.pageData.tracks;
      this.getBgColor();
      this.isLoded = true;
    });
  },
  onShareAppMessage() {
    return {
      title: "分享歌单：" + this.pageData.name,
      path: "/pages/SongList/index?id=" + this.pageData.id,
      imageUrl: this.pageData.coverImgUrl,
    };
  },
};
</script>

<style lang="scss">
.song-list {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bgcolor);
  background-position: center top;
  .box {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(30px);
    .loading {
      position: absolute;
      width: 100%;
      height: 100vh;
      z-index: 1;
      padding-top: 50%;
      background-color: white;
    }
  }
  .main {
    height: calc(100vh - $wx-header-height);
  }
}
</style>