<template>
  <view class="app-home">
    <HomeHeader />
    <view class="loading" v-if="!isLoaded">
      <AppLoading size="50px"/>
    </view>
    <HomeSearch />
    <HomeTypeList v-for="val in topListDetail" :key="val.id" :data="val" />
  </view>
</template>

<script>
import HomeHeader from "./components/HomeHeader";
import HomeTypeList from "./components/HomeTypeList";
import HomeSearch from "./components/HomeSearch";
import { mapState } from "vuex";
export default {
  components: {
    HomeHeader,
    HomeTypeList,
    HomeSearch,
  },
  computed: {
    ...mapState("topList", ["topListDetail","isLoaded"]),
  },
  created() {
    this.$store.dispatch("topList/sendTopListDetail").then((res)=>{
      this.$store.dispatch("topList/loaded")
    })
  }
};
</script>

<style lang="scss">
.app-home {
  width: $body-width;
  margin: auto;
  position: relative;
  .loading{
    position: absolute;
    background: #fff;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    padding-top: 40%;
  }
}
</style>
