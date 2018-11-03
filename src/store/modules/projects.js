import axios from "axios";

const state = {
  projects: [],
  selectedProjectItem: null,
  projectsLoaded: false,
  statusLinkText: "Archived",
  projectApiUrl: "https://devworkflow-api.herokuapp.com/projects"
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

  ADD_TO_PROJECTS: (state, project) => {
    state.projects.unshift(project);
  },

  SET_LOADING_STATUS: (state, status) => {
    state.projectsLoaded = status;
  },

  REMOVE_FROM_PROJECT_LIST: (state, projectToRemove) => {
    state.projects = state.projects.filter(project => {
      return project.id !== projectToRemove.id;
    });
  },

  SET_PROJECT_API_URL: (state, status) => {
    if (status === "ARCHIVE") {
      state.projectApiUrl =
        "https://devworkflow-api.herokuapp.com/archived_projects";
    } else if (status === "ACTIVE") {
      state.projectApiUrl = "https://devworkflow-api.herokuapp.com/projects";
    }
  }
};

const actions = {
  updateProjectStatus: (context, status) => {
    // TODO
    // Updated status on server
    // either 'active' or 'archived'
    // completed is a separate field
  },

  retrieveProjects: context => {
    axios
      .get(state.projectApiUrl, {
        withCredentials: true
      })
      .then(response => {
        context.commit("SET_PROJECTS", response.data.projects);
        context.commit("SET_LOADING_STATUS", true);
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
