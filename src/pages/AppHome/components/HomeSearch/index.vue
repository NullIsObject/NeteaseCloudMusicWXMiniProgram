<template>
    <view class="home-search" @click="toSearchPage">
        <view class="search-btn iconfont icon-search"></view>
        <input type="text" class="search-input" placeholder="搜索歌曲" v-model="searchValue" />
        <view class="remove-text-btn iconfont icon-close" v-if="searchValue"></view>
    </view>
</template>

<script>
export default {
    name: 'HomeSearch',
    data() {
        return {
            searchValue: ''
        }
    },
    methods:{
        toSearchPage(){
            uni.navigateTo({
                url:"/pages/SearchPage/index",
                fail(){
                    console.log(arguments[0])
                }
            })
        }
    }
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

    .search-btn,
    .remove-text-btn {
        color: black;
        opacity: 0.5;
        width: var(--height);
        height: var(--height);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .remove-text-btn {
        justify-content: left;
    }

    .search-input {
        width: 100%;
        height: 100%;
        caret-color: rgba(00, 00, 00, 0.5);
    }
}
</style>