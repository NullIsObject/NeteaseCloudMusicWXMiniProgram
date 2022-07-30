<template>
  <view class="search-history" v-show="searchHistory.length">
    <view class="header">
      <text class="title">历史记录</text>
      <text class="iconfont icon-delete" @click="removeSearchHistory"></text>
    </view>
    <view class="main">
      <text v-for="val in searchHistory" :key="val" @click="startSearch(val)">{{val}}</text>
    </view>
  </view>
</template>
<script>
export default {
  name: "SearchHistory",
  props:{
    searchHistory:{
      type:Array,
      required:true
    },
    removeSearchHistory:{
      type:Function,
      require:true
    }
  },
  methods:{
    startSearch(val){
      this.$store.dispatch('search/getSearchInputValue',val)
    }
  }
};
</script>
<style lang="scss">
.search-history {
  font-size: 30rpx;
  padding-bottom: 3em;
  .header {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
    z-index: 0;
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    text {
      font-size: 0.8em;
      display: block;
      background-color: #f7f7f7;
      border-radius: calc(1em + 20rpx);
      height: 1em;
      min-width: 1em;
      max-width: 50%;
      line-height: 1em;
      text-align: center;
      padding: 20rpx;
      margin: 0.5em 0.5em 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>