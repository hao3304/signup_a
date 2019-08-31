<template>
  <div id="app">
    <router-view v-if="token && me.user_id"></router-view>
    <loading v-if="token && !me.user_id"></loading>
    <Login v-if="!token"> </Login>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import loading from "./views/loading";
import Login from "./views/login/login";
export default {
  components: { loading, Login },
  data() {
    return {};
  },
  computed: {
    ...mapState("common", ["types", "me"]),
    ...mapState(["token"]),
    ...mapState("app", ["modules"])
  },
  watch: {
    $route: {
      handler: "getBreadCrumbs",
      immediate: true
    }
  },
  async beforeCreate() {
    const token = this.$ls.get("token");
    if (token) {
      this.$store.commit("set_token", token);
      await this.$store.dispatch("common/init", token);
      this.set_active_tab(this.$route.name);
    } else {
      this.$router.replace({ name: "Login" });
    }
  },
  methods: {
    ...mapMutations("app", ["set_breadcrumbs", "add_tab", "set_active_tab"]),
    getBreadCrumbs() {
      const { matched } = this.$router.history.current;
      const rst = [];
      matched.forEach(match => {
        if (match.meta.title) {
          rst.push({
            name: match.name,
            title: match.meta.title
          });
        }
      });
      this.set_breadcrumbs(rst.map(r => r.title));
      if (rst.length > 0) {
        const target = rst[rst.length - 1];
        target.icon = this.getIcon(target.name);
        target.params = this.$route.params;
        target.query = this.$route.query;
        this.add_tab(target);
        this.set_active_tab(target.name);
        window.eventBus.$emit("add_tab", target);
      }
    },
    getIcon(name) {
      let icon = "";
      const loop = modules =>
        modules.forEach(module => {
          if (module.path == name) {
            icon = module.icon;
          } else if (module.children) {
            loop(module.children);
          }
        });
      loop(this.modules);
      return icon;
    }
  }
};
</script>
<style lang="less">
#app {
  height: 100%;
  min-width: 1280px;
  overflow: hidden;
  background-color: #eff3f6;
}
</style>
