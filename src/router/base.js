import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import page404 from "@/views/error-page/404.vue";
import Building from "@/views/building";
import layout from "@/layout";
import routes from "./router";

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/building",
      component: layout.single,
      children: [
        {
          path: "",
          name: "Building",
          component: Building
        }
      ]
    },
    {
      path: "/404",
      component: layout.full,
      children: [
        {
          path: "",
          name: "404",
          component: page404
        }
      ]
    },
    ...routes
  ]
});
