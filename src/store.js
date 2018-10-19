import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProjectItemTitle: null
  },

  mutations: {
    SET_SELECTED_PROJECT_ITEM_TITLE: (state, projectItemTitle) => {
      state.selectedProjectItemTitle = projectItemTitle;
    }
  },

  actions: {}
});
