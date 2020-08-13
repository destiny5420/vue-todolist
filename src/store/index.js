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
  List: function(data) {
    return data;
  },
  Done: function(data) {
    return data.filter(data => {
      return data.done === true;
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
    currentRouteName: function(state) {
      return state.route.name;
    },
    dataByRoute: function(state) {
      return DataFilter[state.route.name](state.todoDatas).map(item =>
        state.todoDatas.indexOf(item)
      );
    }
  },
  mutations: {
    SET_TODO: function(state, data) {
      state.todoDatas = data;

      JsonServer.Save(state.todoDatas);
    },
    MODIFY_TODO: function(state, { index, done }) {
      state.todoDatas[index].done = done;

      JsonServer.Save(state.todoDatas);
    },
    DELETE_TODO: function(state, index) {
      state.todoDatas.splice(index, 1);

      JsonServer.Save(state.todoDatas);
    }
  },
  actions: {
    Init: function(context) {
      JsonServer.Load()
        .then(resultData => {
          context.commit("SET_TODO", resultData.data[0].todo);
        })
        .catch(response => {
          console.error(response);
        });
    }
  },
  modules: {}
});
