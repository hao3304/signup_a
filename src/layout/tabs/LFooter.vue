<template>
  <div :class="b()">
    <Breadcrumb :class="b('breadcrumb')">
      <BreadcrumbItem v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
        <i class="iconfont" :class="getIcon(breadcrumb)"></i>
        {{ breadcrumb }}</BreadcrumbItem
      >
    </Breadcrumb>

    <div :class="b('center')" style="text-align:center;">
      <Icon type="ios-barcode-outline" size="24" /> &nbsp;&nbsp;版权所有 &copy;
      2019
      <strong><a href="javascript:void(0)">嘉兴飞凡软件有限公司</a></strong>
    </div>
    <div :class="b('right')">
      {{ system.version }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tabs-footer",
  computed: {
    ...mapState("app", ["breadcrumbs", "modules"]),
    ...mapState("common", ["me", "system"])
  },
  methods: {
    getIcon(name) {
      const module = this.modules.find(module => module.name == name);
      return module ? module.icon : "";
    }
  }
};
</script>

<style lang="less" scoped>
.tabs-footer {
  height: 40px;
  font-size: 14px;
  background-color: #f7f7f7;
  border-color: #dedede;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 15px;

  &__center {
    flex: 1;
    display: flex;
    color: #333;
    align-items: center;
    justify-content: flex-end;
    img {
      width: 26px;
      height: 26px;
      margin-right: 5px;
      margin-top: -4px;
    }

    strong {
      color: #f95a54;
      margin: 0 5px;
    }
  }
  &__right {
    width: 100px;
    color: #333;
    text-align: right;
  }
}
</style>
