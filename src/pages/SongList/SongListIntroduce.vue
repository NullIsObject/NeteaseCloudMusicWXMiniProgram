<template>
  <view
    class="song-list-introduce"
    :style="'--bg-img:url(' + coverImgUrl + ')'"
  >
    <view class="box">
      <SongListHeader />
      <view class="top">
        <image :src="coverImgUrl" mode="widthFix" />
        <view class="list-name"> {{ listName }} </view>
        <view class="hr"></view>
      </view>
      <view class="bottom">
        <view class="tag"> 标签：无 </view>
        <view class="introduce">{{ description }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import SongListHeader from "./components/SongListHeader/index.vue";
export default {
  name: "SongListIntroduce",
  data() {
    return {
      coverImgUrl: "",
      descriptionL: "",
      listName: "",
    };
  },
  components: {
    SongListHeader,
  },
  onLoad({ coverImgUrl, description, listName }) {
    this.coverImgUrl = decodeURIComponent(coverImgUrl);
    this.description = description;
    this.listName = listName;
  },
};
</script>
<style lang="scss">
.song-list-introduce {
  height: 100%;
  background: var(--bg-img);
  background-position: center top;
  .box {
    backdrop-filter: blur(30px);
    .top {
      height: calc((100vh - $wx-header-height) / 2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      image {
        display: block;
        width: 60%;
        border-radius: 5px;
      }
      .list-name {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        color: #fff;
        font-size: 18px;
      }
      .hr {
        width: 100%;
        height: 1px;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.2),
          rgba(255, 255, 255, 0)
        );
      }
    }
    .bottom {
      width: $body-width;
      height: calc((100vh - $wx-header-height) / 2);
      margin: auto;
      color: white;
      font-size: 12px;
      view {
        margin-top: 3vh;
      }
    }
  }
}
</style>