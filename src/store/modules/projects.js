import axios from "axios";

const state = {
  projects: [],
  selectedProjectItem: null,
  projectsLoaded: false,
  statusLinkText: "Archived"
};

const getters = {
  currentProjectItem: state => {
    return state.selectedProjectItem;
  },

  currentProjectLoadingStatus: state => {
    return state.projectsLoaded;
  },

  getProjects: state => {
    return state.projects;
  },

  getStatusLinkText: state => {
    return state.statusLinkText;
  }
};

const mutations = {
  SET_STATUS_LINK_TEXT: (state, linkText) => {
    state.statusLinkText = linkText;
  },

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
  },

  SET_PROJECTS: (state, projects) => {
    state.projects = projects;
  },

  SET_LOADING_STATUS: (state, status) => {
    state.projectsLoaded = status;
  }
};

const actions = {
  retrieveProjects: context => {
    axios
      .get(`https://devworkflow-api.herokuapp.com/projects`, {
        withCredentials: true
      })
      .then(response => {
        context.commit("SET_PROJECTS", response.data.projects);
        context.commit("SET_LOADING_STATUS", true);
        console.log("loading status", state.projectsLoaded);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
