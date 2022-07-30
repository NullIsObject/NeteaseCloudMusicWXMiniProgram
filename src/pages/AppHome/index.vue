<template>
  <view class="app-home">
    <HomeHeader />
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
    ...mapState("topList", ["topListDetail"]),
  },
  created() {
    this.$store.dispatch("topList/sendTopListDetail");
  }
};
</script>

<style lang="scss">
.app-home {
  width: $body-width;
  margin: auto;
}
</style>
