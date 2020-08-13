import Vue from "vue";
import App from "@/views/vApp/index.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "@/router";
import store from "@/store";
import { sync } from "vuex-router-sync";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faList,
  faCalendarCheck,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUserSecret, faList, faCalendarCheck, faTrashAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// vuex-router-sync
sync(store, router);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  // console.log(
  //   "-- [ router.beforeEach ]\n/ to: ",
  //   to,
  //   "\n/ from: ",
  //   from,
  //   "\n/ next: ",
  //   next
  // );
  next();
  // if (to.meta.requiresAuth) {
  //   let api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
  //   console.log(`-- [ Check API: Check ] / api: ${api}`);
  //   Axios.post(api).then(response => {
  //     console.log("-- [ Response: Check ] / res: ", response);
  //     if (response.data.success) {
  //       next();
  //     } else {
  //       next("/login");
  //     }
  //   });
  // } else {
  //   next();
  // }
});
