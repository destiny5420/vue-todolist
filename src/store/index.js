import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    todoDatas: []
  },
  getters: {
    currentRouter: function(state) {
      return state.route.name;
    }
  },
  mutations: {},
  actions: {
    Init: function() {
      let api = `${process.env.VUE_APP_HOST}/datas`;
      axios.get(api).then(response => {
        console.log(response);
      });
    }
  },
  modules: {}
});
