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

const Firebase = {
  Load: async function() {
    let datas = {
      data: []
    };
    await axios
      .get(`${process.env.VUE_APP_HOST}/api/todolist/get`)
      .then(function(response) {
        if (response.data.success === true) {
          for (const item in response.data.data) {
            // console.log(
            //   "Index: ",
            //   index,
            //   " / ID: ",
            //   item,
            //   " / Content: ",
            //   response.data.data[item].content,
            //   " / Done: ",
            //   response.data.data[item].done
            // );

            datas.data.push({
              content: response.data.data[item].content,
              done: response.data.data[item].done,
              id: item
            });
          }
        }
      });

    return datas;
  },
  Delete: async function(datatID) {
    let api = `${process.env.VUE_APP_HOST}/api/todolist/delete/${datatID}`;

    let returnData = false;
    await axios
      .delete(api)
      .then(response => {
        console.log("Delete response success: ", response.data.success);
        returnData = response.data.success;
      })
      .catch(function(err) {
        console.error(err);
      });

    return returnData;
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

const Database = {
  JsonServer: {
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
  Firebase: {
    Load: function(context) {
      Firebase.Load()
        .then(resultData => {
          context.commit("SET_TODO", resultData.data);
        })
        .catch(function(err) {
          console.error(err);
        });
    },
    Add: function(context, data) {
      console.log("-- Firebase Add -- / context: ", context, " / data: ", data);
    },
    Delete: function(context, dataID) {
      // console.log(
      //   "-- Firebase Delete -- / context: ",
      //   context,
      //   " / dataID: ",
      //   dataID
      // );
      Firebase.Delete(dataID).then(function(response) {
        console.log("Firebase / Delete / Response: ", response);
        if (response === true) {
          context.commit("DELETE_TODO", dataID);
        }
      });
    },
    Modify: function(context, { dataID, modifyData }) {
      console.log(
        "-- Firebase Modify -- / context: ",
        context,
        " / dataID: ",
        dataID,
        " / modifyData: ",
        modifyData
      );
    }
  }
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
      console.log("Database Type: ", process.env.VUE_APP_DATABASE_TYPE);
      Database[process.env.VUE_APP_DATABASE_TYPE].Load(context);
    },
    Add: function(context, data) {
      Database[process.env.VUE_APP_DATABASE_TYPE].Add(context, data);
    },
    Delete: function(context, dataID) {
      Database[process.env.VUE_APP_DATABASE_TYPE].Delete(context, dataID);
    },
    Modify: function(context, { dataID, modifyData }) {
      Database[process.env.VUE_APP_DATABASE_TYPE].Modify(context, {
        dataID,
        modifyData
      });
    }
  },
  modules: {}
});
