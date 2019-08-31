import service from "@/services";
export default {
  namespaced: true,
  state: {
    system: {},
    areas: [],
    deps: [],
    dicts: [],
    models: [],
    units: [],
    roles: [],
    users: [],
    ticket_types: [],
    me: {},
    types: {
      iot: []
    }
  },
  actions: {
    async init({ commit }, token) {
      try {
        const rst = await service.getuserbaseinfo({ user_id: token });
        if (rst.data && rst.data.length == 1) {
          commit("SET_INIT", rst.data[0]);
        }
      } catch (e) {
        throw e;
      }
    }
  },
  mutations: {
    SET_INIT(state, payload) {
      state.me = payload;
    },
    SET_TYPES(state, payload) {
      state.types = payload;
    }
  },
  getters: {
    getDict: state => key => {
      const dict = state.dicts.find(dict => dict.id == key);
      return dict ? dict.values : [];
    },
    getDictVal: state => {
      return function(key, value) {
        const target = state.dicts.find(dict => dict.id == key);
        const values = target ? target.values : [];
        const dict = values.find(v => v.value == value);
        return dict ? dict.name : "-";
      };
    }
  }
};
