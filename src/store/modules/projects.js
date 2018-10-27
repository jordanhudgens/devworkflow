import axios from "axios";

const state = {
  selectedProjectItem: null
};

const getters = {
  currentProjectItem: state => {
    return state.selectedProjectItem;
  }
};

// TODO: Complete refactor to separate out vuex into different modules
const mutations = {
  SET_SELECTED_PROJECT_ITEM: (state, payload) => {
    const selectedProjectItem = payload.selectedProject.project_line_items.filter(
      selectedTitle => {
        return selectedTitle.title == payload.title;
      }
    );
    state.selectedProjectItem = selectedProjectItem[0];
  },

  CLEAR_SELECTED_PROJECT_ITEM: state => {
    state.selectedProjectItem = null;
  }
};

export default {
  state,
  getters,
  mutations
};
