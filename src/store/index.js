import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const JsonServer = {
  Load: async function() {
    let datas;
    await axios.get(`${process.env.VUE_APP_HOST}/datas`).then(response => {
      datas = response;
      return response;
    });

    return datas;
  },
  Save: function(data) {
    const dataInfo = {
      todo: data
    };
    axios
      .put(`${process.env.VUE_APP_HOST}/datas/0`, dataInfo)
      .then(response => {
        console.log("-- Save response: ", response);
      });
  }
};

const DataFilter = {
  list: function(data) {
    return data;
  },
  done: function(data) {
    return data.filter(data => {
      return data.complete === true;
    });
  }
  // uncomplete: function(data) {
  //   return data.filter((data) => {
  //     return data.complete === false;
  //   });
  // },
};

export default new Vuex.Store({
  strict: true,
  state: {
    todoDatas: []
  },
  getters: {
    dataByRoute: function(state) {
      return DataFilter[state.route.name](state.todoDatas).map(item => {
        state.todoDatas.indexOf(item);
      });
    }
  },
  mutations: {
    SET_TODO: function(state, data) {
      console.log("data be setted / data: ", data);
      state.todoDatas = data;

      JsonServer.Save(state.todoDatas);
    }
  },
  actions: {
    Init: function(context) {
      JsonServer.Load()
        .then(resultData => {
          console.log("resultData: ", resultData, " / context: ", context);
          context.commit("SET_TODO", resultData.data[0].todo);
        })
        .catch(response => {
          console.error(response);
        });
    }
  },
  modules: {}
});
