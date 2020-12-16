import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Send from "./views/Send.vue";
import User from "./views/User.vue";
import SetUp from "./views/SetUp.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/send",
      name: "send",
      component: Send,
    },
    {
      path: "/user",
      name: "user",
      component: User,
    },
    {
      path: "/setup",
      name: "SetUp",
      component: SetUp,
    },
  ],
});
