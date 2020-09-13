import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Send from "./views/Send.vue";
import Settings from "./views/Settings.vue";
import Filter from "./views/SettingsFilter.vue";

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
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/settingsfilter",
      name: "settingsfilter",
      component: Filter,
    },
  ],
});
