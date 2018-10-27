import Vue from "vue";
import Vuex from "vuex";

import projects from "./modules/projects";
import auth from "./modules/auth";
// import baseState from "./modules/base-state";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    auth
    // baseState
  }
});
