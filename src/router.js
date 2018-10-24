import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ProjectDashboard from "@/views/ProjectDashboard.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "ProjectDashboard",
      component: ProjectDashboard,
      meta: { requiresLogin: true }
    }
  ]
});

export default router;
