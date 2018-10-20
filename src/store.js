import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProjectItemTitle: null,
    selectedProjectItemId: null,
    selectedProjectItem: null
  },

  getters: {
    currentProjectItemTitle: state => {
      return state.selectedProjectItemTitle;
    }
  },

  mutations: {
    SET_SELECTED_PROJECT_ITEM_TITLE: (state, projectItemTitle) => {
      state.selectedProjectItemTitle = projectItemTitle;
    },

    SET_SELECTED_PROJECT_ITEM_ID: (state, projectItemId) => {
      state.selectedProjectItemId = projectItemId;
    },

    SET_SELECTED_PROJECT_ITEM: (state, selectedProjectItem) => {
      state.selectedProjectItem = selectedProjectItem;
    }
  },

  actions: {
    getSelectedProjectItem: (context, projectLineItemId) => {
      axios
        .get(
          `https://devworkflow-api.herokuapp.com/project_line_items/${projectLineItemId}`,
          { withCredentials: true }
        )
        .then(response => {
          console.log("response from vuex", response);
          // context.commit("SET_SELECTED_PROJECT_ITEM");
        })
        .catch(error => {
          console.log("errorrr", error);
        });
    }
  }
});
