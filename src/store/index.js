import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  getters: {
    currentRouter: function(state) {
      return state.route.name;
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
