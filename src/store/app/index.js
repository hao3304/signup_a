export default {
  namespaced: true,
  state: {
    modules: [
      {
        id: 1,
        name: "报名管理",
        icon: "icon-yonghu1",
        path: "Home"
      }
    ],
    module: 0,
    breadcrumbs: [],
    mapLoad: false,
    keepAlive: [],
    tabs: [],
    activeTab: ""
  },
  mutations: {
    set_module(state, payload) {
      state.module = payload;
    },
    set_breadcrumbs(state, payload) {
      state.breadcrumbs = payload;
    },
    set_map_load(state, payload) {
      state.mapLoad = payload;
    },
    set_keep_alive(state, payload) {
      state.keepAlive = payload;
    },
    set_tabs(state, payload) {
      state.tabs = payload || [];
    },
    add_tab(state, payload) {
      if (!state.tabs.find(t => t.name == payload.name)) {
        state.tabs.push(payload);
      }
    },
    remove_tab(state, payload) {
      state.tabs = state.tabs.filter(t => t.name != payload);
    },
    set_active_tab(state, payload) {
      state.activeTab = payload;
    }
  }
};
