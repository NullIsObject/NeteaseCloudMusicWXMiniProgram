<template>
  <view class="search-result">
    <SearchResultList
      v-for="(val, index) in searchResult"
      :key="add(val.id, index)"
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
    ...mapState("search", ["searchResult", "searchInputValue"]),
  },
  methods: {
    add(a, b) {
      //兼容小程序
      return a + b;
    },
  },
};
</script>