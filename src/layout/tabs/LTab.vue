<template>
  <div :class="b()">
    <div :class="b('items')" @contextmenu.prevent="onFalse()">
      <chrome-tab
        @click="onSelect"
        @remove="onRemoveTab"
        @contextmenu="onContextMenu"
        ref="tab"
        v-model="tab"
        :tabs="defaultTabs"
      />
      <CellGroup
        @on-click="onClickContextMenu"
        :class="b('context-menu')"
        v-show="contextmenu"
        :style="{ left: left + 'px', top: top + 'px' }"
        v-clickoutside="onClickOutSide"
      >
        <Cell
          :disabled="tabs.length <= 1"
          name="current"
          title="关闭这个标签页"
        />
        <Cell
          :disabled="tabs.length <= 1"
          name="other"
          title="关闭其他标签页"
        />
        <Cell :disabled="tabs.length <= 1" name="all" title="关闭所有标签页" />
      </CellGroup>
    </div>
    <div :class="b('toolbar')"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import chromeTab from "./chrome-tab";
import clickoutside from "@/directives/clickoutside";
export default {
  name: "tabs-tab",
  components: { chromeTab },
  directives: { clickoutside },
  watch: {
    activeTab() {
      this.tab = this.activeTab;
    },
    tabs() {
      this.$ls.set("tabs", this.tabs, new Date().valueOf() + 3600 * 24000);
    }
  },
  computed: {
    ...mapState("app", ["tabs", "activeTab"])
  },
  data() {
    return {
      tab: this.activeTab,
      defaultTabs: [],
      contextmenu: false,
      top: 0,
      left: 0,
      selectTab: null
    };
  },
  methods: {
    ...mapMutations("app", ["remove_tab", "set_tabs"]),
    onSelect(e, tab) {
      const target = this.tabs.find(t => t.name == tab.key);
      this.$router.push({
        name: target.name,
        query: target.query,
        params: target.params
      });
    },
    onRemoveTab(tab) {
      const target = this.tabs.find(t => t.name == this.tab);
      this.$router.push({
        name: target.name,
        query: target.query,
        params: target.params
      });
      this.remove_tab(tab.key);
    },
    onContextMenu(e, tab) {
      if (this.tabs.length <= 1) return;
      this.contextmenu = true;
      this.left = e.clientX;
      this.top = e.offsetY + 10;
      this.selectTab = tab;
    },
    onClickOutSide() {
      this.contextmenu = false;
    },
    onFalse() {
      return false;
    },
    onClickContextMenu(m) {
      this.contextmenu = false;
      switch (m) {
        case "current":
          return this.$refs.tab.removeTab(this.selectTab.key);
        case "other":
          return this.tabs.forEach(tab => {
            if (tab.name != this.selectTab.key) {
              this.$refs.tab.removeTab(tab.name);
            }
          });

        case "all":
          return this.tabs.forEach((tab, index) => {
            if (index > 0) {
              this.$refs.tab.removeTab(tab.name);
            }
          });
      }
    }
  },
  mounted() {
    this.tab = this.activeTab;
  },
  created() {
    const tabs = this.$ls.get("tabs");
    if (tabs) {
      this.set_tabs(tabs);
    }

    if (this.tabs.length > 0) {
      this.defaultTabs = this.tabs.map(tab => {
        return {
          label: tab.title,
          key: tab.name,
          favico: h => {
            return h("i", {
              class: tab.icon
                ? `iconfont ${tab.icon}`
                : "ivu-icon ivu-icon-logo-windows"
            });
          }
        };
      });
    }
    window.eventBus.$off("add_tab").$on("add_tab", tab => {
      const target = this.$refs.tab.tabs.find(t => t.key == tab.name);
      if (this.$refs.tab && !target) {
        this.$refs.tab.addTab({
          label: tab.title,
          key: tab.name,
          favico: h => {
            return h("i", {
              class: tab.icon
                ? `iconfont ${tab.icon}`
                : "ivu-icon ivu-icon-logo-windows"
            });
          }
        });
      } else {
        target.label = tab.title;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.tabs-tab {
  height: 40px;
  font-size: 13px;
  &__items {
    flex: 1;
    height: 100%;
    position: relative;
  }

  &__context-menu {
    position: absolute;
    z-index: 2000;
    width: 200px;
    background-color: #fff;
    border: 1px solid #bbb;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
  }
}
</style>
