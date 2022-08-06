<template>
  <view class="search-result-list" @click="openThatMusic(searchResultData.id)">
    <view class="box">
      <view
        class="music-name"
        v-html="giveKeywordColor(searchResultData.name)"
      ></view>
      <view class="introduce">
        <view class="text-box">
          <view
            v-for="(val, index) in searchResultData.artists"
            :key="val.id"
            class="inline-box"
          >
            <view v-html="giveKeywordColor(val.name)"></view>
            <template v-if="index + 1 < searchResultData.artists.length"
              >/</template
            >
          </view>
          <view
            v-html="'-' + giveKeywordColor(searchResultData.album.name)"
            class="inline-box"
          ></view>
        </view>
      </view>
      <view class="iconfont icon-play-that"></view>
    </view>
  </view>
</template>
<script>
export default {
  name: "SearchResultList",
  props: {
    searchResultData: {
      type: Object,
      required: true,
    },
    searchInputValue: {},
  },
  methods: {
    giveKeywordColor(str, keyword = this.searchInputValue) {
      let res = ""; //结果
      const labelL = `<mark class="mark" style="color:#507DAF;background: none;">`;
      const labelR = "</mark>";
      const arr = str.split("");
      str = str.toLowerCase();//匹配结果不区分字符大小写，所以全部转小写匹配
      keyword = keyword.toLowerCase();//同上↑
      let keywordLocation = str.indexOf(keyword);
      if (keywordLocation >= 0) {
        arr[keywordLocation] = labelL + arr[keywordLocation];
        arr[keywordLocation + keyword.length - 1] += labelR;
      }
      res = arr.join("");
      return res;
    },
    openThatMusic(id){
      uni.navigateTo({
        url:`/pages/PlayerPage/index?id=${id}`
      })
    }
  },
};
</script>
<style lang="scss">
.search-result-list {
  font-size: 30rpx;
  position: relative;
  height: 5em;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .mark {
    color: #507daf;
    background: none;
  }
  .inline-box {
    display: flex;
  }
  & > view {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .text-box {
      width: 100%;
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .music-name {
    font-size: 1.1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .introduce {
    font-size: 12px;
    opacity: 0.5;
  }
  .iconfont {
    font-size: 2.5em;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.2;
  }
}
</style>