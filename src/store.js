import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProjectItem: null
  },

  getters: {
    currentProjectItem: state => {
      return state.selectedProjectItem;
    }
  },

  mutations: {
    SET_SELECTED_PROJECT_ITEM: (state, selectedProjectItem) => {
      state.selectedProjectItem = selectedProjectItem;
    }
  },

  actions: {}
});
