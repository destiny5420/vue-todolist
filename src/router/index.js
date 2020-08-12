import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/list"
  },
  {
    path: "",
    redirect: "/list"
  },
  {
    path: "/list",
    name: "List"
  },
  {
    path: "/done",
    name: "Done"
  }
];

const router = new VueRouter({
  routes
});

export default router;
