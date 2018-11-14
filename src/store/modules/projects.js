import axios from "axios";

const state = {
  projects: [],
  selectedProjectItem: null,
  projectsLoaded: false,
  statusLinkText: "Archived",
  projectApiUrl: "https://devworkflow-api.herokuapp.com/projects",
  checkListItems: [],
  showNewCheckListItemForm: false
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

  currentCheckListItems: state => {
    return state.checkListItems;
  },

  getNewCheckListItemFormStatus: state => {
    return state.showNewCheckListItemForm;
  },

  getStatusLinkText: state => {
    return state.statusLinkText;
  }
};

const mutations = {
  SET_STATUS_LINK_TEXT: (state, linkText) => {
    state.statusLinkText = linkText;
  },

  TOGGLE_NEW_CHECK_LIST_ITEM_FORM_STATUS: state => {
    state.showNewCheckListItemForm = !state.showNewCheckListItemForm;
  },

  SET_SELECTED_PROJECT_ITEM: (state, payload) => {
    const selectedProjectItem = payload.selectedProject.project_line_items.filter(
      selectedTitle => {
        return selectedTitle.title == payload.title;
      }
    );
    state.selectedProjectItem = selectedProjectItem[0];
    state.showNewCheckListItemForm = false;
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

  ADD_TO_CHECK_LIST_ITEMS: (state, checkListItem) => {
    if (state.selectedProjectItem.check_list_items) {
      state.selectedProjectItem.check_list_items.push(checkListItem);
    } else {
      state.selectedProjectItem.check_list_items = [checkListItem];
    }
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
  },

  UPDATE_CHECK_LIST_ITEM_STATUS: (state, listItem) => {
    const checkListItems = state.selectedProjectItem.check_list_items.map(
      li => {
        if (li.id === listItem.id) {
          li.completed = listItem.completed;
        }

        return li;
      }
    );
    state.selectedProjectItem.check_list_items = checkListItems;
  }
};

const actions = {
  updateProjectStatus: (context, id) => {
    axios
      .patch(
        `https://devworkflow-api.herokuapp.com/projects/${id}`,
        { project: { status: state.statusLinkText.toLowerCase() } },
        { withCredentials: true }
      )
      .then(response => {
        state.projects = state.projects.filter(project => {
          return project.id !== response.data.project.id;
        });
      })
      .catch(error => {
        console.log("errorrr", error);
      });
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
  },

  updateProductLineItem: context => {
    axios
      .patch(
        "https://devworkflow-api.herokuapp.com/project_line_items/" +
          state.selectedProjectItem.id,
        {
          project_line_item: {
            description: state.selectedProjectItem.description,
            completed: state.selectedProjectItem.completed
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        context.commit("CLEAR_SELECTED_PROJECT_ITEM");
      })
      .catch(error => {
        console.log("errorrr", error);
      });
  },

  createCheckListItem: (context, title) => {
    axios
      .post(
        "https://devworkflow-api.herokuapp.com/check_list_items/",
        {
          check_list_item: {
            title: title,
            completed: false,
            project_line_item_id: state.selectedProjectItem.id
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        context.commit(
          "ADD_TO_CHECK_LIST_ITEMS",
          response.data.check_list_item
        );
      })
      .catch(error => {
        console.log("errorrr", error);
      });
  },

  updateCheckListItemCompleteStatus: (context, checkListItem) => {
    axios
      .patch(
        "https://devworkflow-api.herokuapp.com/check_list_items/" +
          checkListItem.id,
        {
          check_list_item: {
            completed: !checkListItem.completed
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        context.commit(
          "UPDATE_CHECK_LIST_ITEM_STATUS",
          response.data.check_list_item
        );
      })
      .catch(error => {
        console.log("errorrr", error);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
