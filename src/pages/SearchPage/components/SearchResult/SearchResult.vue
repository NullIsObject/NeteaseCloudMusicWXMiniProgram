<template>
  <view class="search-result">
    <SearchResultList
      v-for="(val, index) in searchResult"
      :key="val.id + index"
      :searchResultData="val"
      :searchInputValue="searchInputValue"
    />
  </view>
</template>
<script>
import SearchResultList from "../SearchResultList/SearchResultList.vue";
import { mapState } from "vuex";
export default {
  name: "SearchResult",
  components: { SearchResultList },
  computed: {
    ...mapState("search", ["searchResult","searchInputValue"]),
  },
};
</script>
<style lang="scss">
.search-result {
}
</style>