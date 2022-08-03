<template>
  <view class="comment-area">
    <view class="title">精彩评论</view>
    <view class="user-box">
      <view class="item">
        <view class="user-head">头像</view>
        <view class="user-data">
          <view class="user-name-time">
            <text class="user-name">用户名</text>
            <text class="user-time">昨天00:00</text>
          </view>
          <view class="user-good">
            111
            <text class="iconfont icon-good"></text>
          </view>
        </view>
        <view class="user-comment-box">
          <view class="user-comment">评论内容</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "CommentArea",
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
      .user-head {
        width: 35px;
        height: 35px;
        background-color: yellow;
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
        .user-comment{
            width: calc(100% - 45px);
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255,255,255,.2);
        }
      }
    }
  }
}
</style>