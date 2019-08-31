<template>
  <div class="l-full">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "LFull",
  computed: {
    ...mapState("app", ["tabs"]),
    notCacheName() {
      return [
        this.$route.meta && this.$route.meta.notCache ? this.$route.name : ""
      ];
    },
    cacheList() {
      return this.tabs.map(t => t.name);
    }
  }
};
</script>

<style scoped>
.l-full {
  height: 100%;
  overflow: hidden;
}
</style>
