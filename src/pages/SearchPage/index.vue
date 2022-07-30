<template>
  <view class="search-page">
    <view class="header">
      <SearchPageHeader />
      <view class="search-box">
        <SearchInput :addSearchHistory="addSearchHistory"/>
      </view>
    </view>
    <SearchMain
      :searchHistory="searchHistory"
      :removeSearchHistory="removeSearchHistory"
    />
  </view>
</template>
<script>
import SearchPageHeader from "./components/SearchPageHeader/SearchPageHeader";
import SearchInput from "./components/SearchInput/SearchInput";
import SearchMain from "./components/SearchMain/SearchMain.vue";

import {mapState} from "vuex"

let that;

export default {
  name: "SearchPage",
  components: {
    SearchPageHeader,
    SearchInput,
    SearchMain,
  },
  data() {
    that = this;
    return {
      searchHistory: [],
      searchResultOffset:0//下一次为搜索结果添加数据的页数
    };
  },
  computed:{
    ...mapState('search',['searchResult','searchInputValue'])
  },
  methods: {
    addSearchHistory(newVal) {
      newVal = newVal.trim();
      if (!newVal) return 0;
      let i = 0;
      that.searchHistory.some((val) => {
        if (val == newVal) {
          that.searchHistory.splice(i, 1);
        }
        i++;
        return val == newVal;
      });
      that.searchHistory.unshift(newVal);
    },
    removeSearchHistory() {
      that.searchHistory = [];
    },
  },
  watch: {
    searchHistory(val) {
      uni.setStorage({
        key: "searchHistory",
        data: val,
      });
    },
    searchInputValue(){
      this.searchResultOffset=0
      this.$store.dispatch("search/clearSearchResult")
    }
  },
  created() {
    uni.getStorage({
      key: "searchHistory",
      success: (res) => {
        this.searchHistory = res.data;
      },
    });
  },
  onReachBottom(){
    if(this.searchResult.length){
      this.$store.dispatch("search/sendSearch",{keywords:this.searchInputValue,offset:++this.searchResultOffset})
    }
  }
};
</script>
<style lang="scss">
.search-page {
  .header {
    background: white;
    position: sticky;
    top: 0px;
    z-index: 1;
    padding-bottom: 10rpx;

    .search-box {
      width: $body-width;
      margin: auto;
    }
  }
}
</style>