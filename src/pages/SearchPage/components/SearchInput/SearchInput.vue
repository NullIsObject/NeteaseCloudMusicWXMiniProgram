<template>
  <view class="home-search">
    <view class="search-btn iconfont icon-search"></view>
    <input
      type="text"
      class="search-input"
      placeholder="搜索歌曲"
      v-model="searchValue"
      :focus="isFocus"
      @confirm="startSearch"
      @focus="(isShowInputHint = true), (isFocus = true)"
      @blur="isFocus = false"
    />
    <view
      class="remove-text-btn iconfont icon-close"
      v-show="searchValue"
      @click="removeInput"
    ></view>
    <view class="input-hint" v-show="isShowInputHint && searchValue">
      <view class="hint-title">搜索“{{ searchValue }}”</view>
      <view class="ul">
        <view class="li" v-for="(val, index) in searchSuggest" :key="index">
          <text class="iconfont icon-search" />
          <text>{{ val.keyword }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SearchInput",
  data() {
    return {
      searchValue: "",
      searchSuggest: [],
      isShowInputHint: true,
      isFocus: true,
    };
  },
  computed: {
    ...mapState("search", { storeSearchInputValue: "searchInputValue" }),
  },
  methods: {
    removeInput() {
      this.searchValue = "";
    },
    getSearchSuggest() {
      //获取搜索提示;
      const searchValue = this.searchValue.trim();
      if (!searchValue) return 0;
      this.$api.searchSuggest(searchValue).then((res) => {
        this.searchSuggest = res.data.result.allMatch;
      });
    },
    startSearch() {
      //开始搜索
      this.isShowInputHint = false;
      this.addSearchHistory(this.searchValue); //添加搜索历史记录
      this.$store.dispatch("search/sendSearch", {
        onOff: true,
        keywords: this.searchValue,
      });
    },
  },
  watch: {
    searchValue(val) {
      this.isShowInputHint = true;
      this.getSearchSuggest();
      this.$store.dispatch("search/getSearchInputValue", val); //设置vuex中的SearchInputValue，实现state的双向绑定
      if (!this.isFocus && this.searchValue) {
        //当searchValue被修改，且searcValue不为空字符串时，如果搜索框没有获得焦点，说明此时是点击了热搜榜或者历史记录触发
        this.startSearch();
      }
    },
    storeSearchInputValue(val) {
      //监视vuex中SearchInputValue的变化，实现state的双向绑定
      this.searchValue = val;
    },
  },
  props: ["addSearchHistory"],
};
</script>

<style lang="scss">
.home-search {
  --height: 35px;
  width: 100%;
  height: var(--height);
  background: #f7f7f7;
  border-radius: var(--height);
  margin: auto;
  display: flex;
  font-size: 30rpx;
  position: relative;

  .search-btn,
  .remove-text-btn {
    color: black;
    opacity: 0.5;
    width: var(--height);
    height: var(--height);
    line-height: var(--height);
    text-align: center;
  }

  .remove-text-btn {
    text-align: left;
  }

  .search-input {
    width: 100%;
    height: 100%;
    caret-color: rgba(00, 00, 00, 0.5);
  }

  .input-hint {
    background-color: #fff;
    position: absolute;
    top: 100%;
    width: 100%;
    height: calc(100vh - $wx-header-height - var(--height));
    color: #507daf;
    font-size: 1.1em;
    padding-top: 30rpx;

    .ul {
      .li {
        width: calc(100% - 2em);
        height: 50px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 50px;
        font-size: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .iconfont {
          margin-right: 20rpx;
        }
      }
    }
  }
}
</style>