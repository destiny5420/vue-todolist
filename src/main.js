import Vue from "vue";
import App from "@/views/vApp/index.vue";
import router from "./router";
import store from "./store";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faList,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faList, faCalendarCheck);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
