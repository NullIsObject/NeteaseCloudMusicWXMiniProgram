<template>
  <view class="comment-area">
    <view class="title">精彩评论</view>
    <view class="user-box">
      <view class="item" v-for="val in commentData" :key="val.commentID">
        <image class="user-head" :src="val.user.avatarUrl" mode="widthFix" />
        <view class="user-data">
          <view class="user-name-time">
            <text class="user-name">{{ val.user.nickname }}</text>
            <text class="user-time">{{ val.time | commentDate }}</text>
          </view>
          <view class="user-good">
            {{ val.likedCount }}
            <text class="iconfont icon-good"></text>
          </view>
        </view>
        <view class="user-comment-box">
          <view class="user-comment">{{ val.content }}</view>
        </view>
      </view>
    </view>
    <view class="loading" v-if="hasMoreComment">
      <AppLoading />
    </view>
    <view class="notHasMoreComment" v-if="!hasMoreComment">没有更多评论了</view>
  </view>
</template>
<script>
export default {
  name: "CommentArea",
  props: ["commentData","hasMoreComment"],
  filters: {
    commentDate(val) {
      const date = new Date(val);
      const year = date.getFullYear();
      const month = date.getMonth()+1;
      const day = date.getDay();
      return year + "年" + month + "月" + day + "日";
    },
  },
};
</script>
<style lang="scss">
.comment-area {
  color: white;
  font-size: 30rpx;
  .title {
    font-size: 1.1em;
    margin-top: 50px;
  }
  .user-box {
    position: relative;
    padding-top: 20px;
    .item {
      display: flex;
      flex-wrap: wrap;
      padding-top: 10px;
      .user-head {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .user-data {
        display: flex;
        .user-name-time {
          .user-name {
            font-size: 12px;
          }
          .user-time {
            display: block;
            font-size: 12px;
            transform: scale(75%);
            transform-origin: 0 0;
            opacity: 0.5;
          }
        }
        .user-good {
          position: absolute;
          right: 0;
        }
      }
      .user-comment-box {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .user-comment {
          width: calc(100% - 45px);
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
  .loading {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notHasMoreComment {
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
}
</style>