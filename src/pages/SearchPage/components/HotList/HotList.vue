<template>
  <view class="hot-list">
    <view class="title">热搜榜</view>
    <view class="ul">
      <view
        class="li"
        v-for="(val, index) in searchHotDetail"
        :key="val.searchWord"
        @click="startSearch(val.searchWord)"
      >
        <text class="num">{{ index + 1 }}</text>
        <view class="music-data">
          <view class="music-name">
            {{ val.searchWord }}
            <text v-if="!index" class="hot">HOT</text>
          </view>
          <view class="music-description"> {{val.content}} </view>
        </view>
        <view class="view-counts">{{ val.score }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "HotList",
  data() {
    return {
      hotDetail: [],
    };
  },
  computed: {
    ...mapState("search", ["searchHotDetail"]), //获取数据
  },
  methods:{
    startSearch(val){
      this.$store.dispatch('search/getSearchInputValue',val)
    }
  },
  created() {
    this.$store.dispatch("search/sendSearchHotDetail"); //发送数据请求
  },
};
</script>
<style lang="scss">
.hot-list {
  font-size: 30rpx;

  .ul {
    .li {
      display: flex;
      align-items: center;
      position: relative;
      height: 120rpx;
      color: rgba(0, 0, 0, 0.5);

      &:nth-child(-n + 3) > .num {
        color: red;
      }

      .num {
        font-size: 1.1em;
        margin-right: 30rpx;
      }

      .music-data {
        .music-name {
          font-size: 1.2em;
          color: black;
          .hot {
            color: red;
            font-size: 0.5em;
            margin-left: 10rpx;
            font-style: italic;
            font-weight: bold;
          }
        }

        .music-description {
          font-size: 12px;
          width: 500rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .view-counts {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>