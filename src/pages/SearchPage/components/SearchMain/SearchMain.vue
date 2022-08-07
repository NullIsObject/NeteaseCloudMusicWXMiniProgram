<template>
  <view class="search-main">
    <view v-show="!isInSearch && !searchResultDataLength">
      <SearchHistory
        :searchHistory="searchHistory"
        :removeSearchHistory="removeSearchHistory"
      />
      <HotList />
    </view>
    <SearchResult v-show="searchResultDataLength" />
    <view class="loading-box" v-show="isInSearch">
      <AppLoading />
    </view>
  </view>
</template>
<script>
import SearchHistory from "@/pages/SearchPage/components/SearchHistory/SearchHistory";
import HotList from "@/pages/SearchPage/components/HotList/HotList";
import SearchResult from "../SearchResult/SearchResult.vue";

import { mapState } from "vuex";

export default {
  name: "SearchMain",
  components: {
    SearchHistory,
    HotList,
    SearchResult,
  },
  computed: {
    ...mapState("search", {
      searchResultData: "searchResult",
      isInSearch: "isInSearch",
    }),
    searchResultDataLength() {
      //判断显示哪部分组件，直接使用“searchResultData.length”在微信小程序端会有bug
      return this.searchResultData.length;
    },
  },
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
    removeSearchHistory: {
      type: Function,
      require: true,
    },
  },
  watch: {
    searchResultData(val) {
      if (val.length == 0) {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 0,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.search-main {
  width: $body-width;
  margin: auto;
  .loading-box {
    width: 100%;
    padding: 10px;
  }
}
</style>