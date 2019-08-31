<template>
  <div :class="b()">
    <l-header></l-header>
    <div :class="b('container')">
      <l-nav></l-nav>
      <div :class="b('main')">
        <l-tab></l-tab>
        <keep-alive :include="cacheList" :exclude="notCacheName">
          <router-view :class="b('view')"></router-view>
        </keep-alive>
        <l-footer></l-footer>
      </div>
    </div>
  </div>
</template>

<script>
import LHeader from "./LHeader";
import LTab from "./LTab";
import LNav from "./LNav";
import LFooter from "./LFooter";
import { mapState } from "vuex";
export default {
  name: "l-tabs",
  components: { LHeader, LTab, LNav, LFooter },
  computed: {
    ...mapState("app", ["tabs"]),
    notCacheName() {
      return [
        this.$route.meta && this.$route.meta.notCache ? this.$route.name : ""
      ];
    },
    cacheList() {
      return ["LFull"].concat(this.tabs.map(t => t.name));
    }
  }
};
</script>

<style lang="less" scoped>
.l-tabs {
  display: flex;
  height: 100%;
  flex-direction: column;
  &__container {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
  &__main {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  &__view {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .f-panel__header {
    background-color: #fff;
  }
}
</style>
