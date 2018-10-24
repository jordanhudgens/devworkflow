import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import loggedIn from "./helpers/loggedIn.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedProjectItem: null,
    user: null,
    loggedInStatus: "NOT_LOGGED_IN",
    isLoading: true,
    selectedCard: null
  },

  getters: {
    currentProjectItem: state => {
      return state.selectedProjectItem;
    },

    getLoginStatus: state => {
      return state.loggedInStatus;
    },

    currentUser: state => {
      return state.user;
    },

    getLoadingStatus: state => {
      return state.isLoading;
    },

    getSelectedCard: state => {
      return state.selectedCard;
    }
  },

  mutations: {
    SET_SELECTED_CARD: (state, selectedCard) => {
      state.selectedCard = selectedCard;
    },

    CLEAR_SELECTED_CARD: state => {
      state.selectedCard = null;
    },

    SET_SELECTED_PROJECT_ITEM: (state, selectedProjectItem) => {
      state.selectedProjectItem = selectedProjectItem;
    },

    SET_CURRENT_USER: (state, user) => {
      state.user = user;
      state.isLoggedIn = true;
    },

    CLEAR_SELECTED_PROJECT_ITEM: state => {
      state.selectedProjectItem = null;
    },

    SET_LOGIN_STATUS: (state, status) => {
      state.loggedInStatus = status;
    },

    SET_LOADING_STATUS: (state, booleanStatus) => {
      state.isLoading = booleanStatus;
    }
  },

  actions: {
    removeLink: (context, link) => {
      context.commit("REMOVE_LINK", link);
    },

    storeCheckLoginStatus: context => {
      loggedIn()
        .then(res => {
          if (res.logged_in) {
            context.commit("SET_CURRENT_USER", res.user);
            context.commit("SET_LOGIN_STATUS", "LOGGED_IN");
          } else {
            context.commit("SET_LOGIN_STATUS", "NOT_LOGGED_IN");
          }
          context.commit("SET_LOADING_STATUS", false);
        })
        .catch(error => {
          context.commit("SET_LOGIN_STATUS", "ERROR_LOGGING_IN");
        });
    }
  }
});
