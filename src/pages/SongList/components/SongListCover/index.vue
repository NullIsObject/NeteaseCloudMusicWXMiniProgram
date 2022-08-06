<template>
  <view class="song-list-cover">
    <view class="left">
      <image class="tag-image" :src="pageData.coverImgUrl" />
      <text class="tag-text iconfont icon-amount-of-play">{{
        pageData.playCount | numFilter
      }}</text>
    </view>
    <view class="right">
      <view class="title">{{ pageData.name }}</view>
      <view class="logo">
        <image class="tag-image" src="@/static/logo.png" />
        <text class="tag-text">网易云音乐</text>
      </view>
      <view class="introduce" @click="toSongListIntroduce">
        <text class="tag-text description-text">{{ descriptionTop }}</text>
        <text class="tag-text">
          <text class="tag-text">{{ descriptionBottom }}</text>
        </text>
        <text class="tag-text iconfont icon-more"></text>
      </view>
      <view>
        <!-- flex占位 -->
        <view v-show="false">
          <!-- 执行sliceDescriptionFromPropsFunctionTime函数 -->
          {{ sliceDescriptionFromPropsFunctionTime }}
        </view>
      </view>
    </view>
    <view class="share-btn-box">
      <view class="share-btn">
        <text class="tag-text iconfont icon-share"></text>
        分享给微信好友
      </view>
    </view>
  </view>
</template>
<script>
let that;
export default {
  name: "SongListCover",
  data() {
    that = this;
    return {
      descriptionTop: "",
      descriptionBottom: "",
      isExemounted: false, //判断是否已经执行了mounted钩子
    };
  },
  props: {
    pageData: {
      default: {
        coverImgUrl: "",
        description: "",
      },
    },
  },
  methods: {
    toSongListIntroduce() {
      uni.navigateTo({
        url: `/pages/SongList/SongListIntroduce?coverImgUrl=${encodeURIComponent(
          this.pageData.coverImgUrl
        )}&description=${this.pageData.description}&listName=${
          this.pageData.name
        }`,
      });
    },
    sliceDescriptionFromProps() {
      //对description属性进行分割，实现文字溢出出现省略号后，箭头符号能紧跟文字
      //该方法执行时须满足两个条件：（页面数据已经请求成功，页面元素.description-text已经渲染完毕）
      //该方法在computed钩子的sliceDescriptionFromPropsFunctionTime方法中调用
      const query = uni.createSelectorQuery().in(that);
      query
        .select(".description-text")
        .boundingClientRect((data) => {
          that.descriptionTop = that.pageData.description.slice(
            0,
            parseInt(data.width / 12)
          );
          that.descriptionBottom = that.pageData.description.slice(
            parseInt(data.width / 12)
          );
        })
        .exec();
    },
  },
  filters: {
    numFilter(num) {
      num = Number(num);
      if (num >= 100000000) {
        return parseInt(num / 100000000) + "亿";
      } else if (num >= 10000) {
        return parseInt(num / 10000) + "万";
      } else {
        return num;
      }
    },
  },
  computed: {
    sliceDescriptionFromPropsFunctionTime() {
      //sliceDescriptionFromProps函数的执行时间
      if (that.pageData.description.length > 0 && that.isExemounted) {
        that.sliceDescriptionFromProps();
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    that.isExemounted = true;
  },
};
</script>
<style lang="scss">
.song-list-cover {
  width: $body-width;
  margin: auto;
  height: 510rpx;
  padding-top: 40rpx;
  display: flex;
  justify-content: space-between;
  position: relative;
  color: white;
  font-size: 30rpx;

  .left {
    width: 230rpx;
    height: 230rpx;
    overflow: hidden;
    border-radius: 15rpx;
    position: relative;

    .tag-image {
      width: 100%;
      height: 100%;
    }

    .tag-text {
      position: absolute;
      right: 10rpx;
      top: 4rpx;
    }
  }

  .right {
    width: 420rpx;
    height: 230rpx;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .title {
      font-size: 35rpx;
    }

    .logo {
      --logo-size: 50rpx;
      height: var(--logo-size);
      display: flex;

      .tag-image {
        width: var(--logo-size);
        height: var(--logo-size);
        display: block;
      }

      .tag-text {
        font-size: 25rpx;
        line-height: var(--logo-size);
        margin-left: 13rpx;
      }
    }

    .introduce {
      font-size: 12px;
      opacity: 0.6;
      & > .tag-text:first-child {
        float: left;
        width: calc(100% - 2em);
        height: 1.5em;
        overflow: hidden;
      }
      & > .tag-text:nth-child(2) {
        max-width: calc(100% - 2em);
        float: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & > .tag-text:last-child {
        height: 50%;
        font-size: 12px;
        float: left;
        display: flex;
        align-items: center;
      }
    }
  }

  .share-btn-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 280rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .share-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba($color: #fff, $alpha: 0.1);
      width: 50%;
      height: 65rpx;
      border-radius: 65rpx;

      .iconfont {
        font-size: 1em;
      }

      .tag-text {
        margin-right: 10rpx;
      }
    }
  }
}
</style>