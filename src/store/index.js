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
    axios.put(`${process.env.VUE_APP_HOST}/datas`, dataInfo).then(response => {
      console.log("-- Save response: ", response);
    });
  },
  Add: async function(data) {
    let result;
    await axios
      .post(`${process.env.VUE_APP_HOST}/datas`, data)
      .then(response => {
        result = response;
      });

    return result;
  },
  Delete: async function(dataID) {
    await axios
      .delete(`${process.env.VUE_APP_HOST}/datas/${dataID}`)
      .then(response => {
        console.log("-- Delete Result: ", response);
      });

    return "";
  },
  Modify: async function(dataID, data) {
    let result;
    await axios
      .patch(`${process.env.VUE_APP_HOST}/datas/${dataID}`, data)
      .then(response => {
        result = response;
      });

    return result;
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
    },
    ADD_TODO: function(state, data) {
      state.todoDatas.push(data);
    },
    MODIFY_TODO: function(state, modifyData) {
      const matchIndex = state.todoDatas.findIndex(
        item => item.id === modifyData.data.id
      );

      if (matchIndex !== -1) {
        Vue.set(state.todoDatas, matchIndex, modifyData.data);
        // state.todoDatas[matchIndex] = modifyData.data;
      }
    },
    DELETE_TODO: function(state, dataID) {
      const removeIndex = state.todoDatas.findIndex(item => item.id === dataID);

      if (removeIndex !== -1) {
        state.todoDatas.splice(removeIndex, 1);
      }
    }
  },
  actions: {
    Load: function(context) {
      JsonServer.Load()
        .then(resultData => {
          context.commit("SET_TODO", resultData.data);
        })
        .catch(response => {
          console.error(response);
        });
    },
    Add: function(context, data) {
      JsonServer.Add(data)
        .then(resultData => {
          context.commit("ADD_TODO", resultData.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    Delete: function(context, dataID) {
      JsonServer.Delete(dataID)
        .then(() => {
          context.commit("DELETE_TODO", dataID);
        })
        .catch(err => {
          console.error(err);
        });
    },
    Modify: function(context, { dataID, modifyData }) {
      JsonServer.Modify(dataID, modifyData)
        .then(resultData => {
          context.commit("MODIFY_TODO", resultData);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  modules: {}
});
