<template>
  <div id="app">
    <div v-if="isLoading">
      Loading...
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: "App",

  computed: {
    ...mapState([
      'isLoading'
    ])
  },

  beforeMount() {
    this.getLoadingStatus();
  },

  updated() {
    if (this.getLoginStatus() === 'LOGGED_IN') {
      this.$router.push({
        name: 'ProjectDashboard',
      });
    } else {
      this.$router.push({
        name: 'home',
      });
    }
  },

  methods: {
    ...mapGetters([
      'getLoadingStatus',
      'getLoginStatus',
    ]),

    ...mapMutations([
      'SET_LOADING_STATUS',
    ])
  }
}
</script>


<style lang="scss">
@import './styles/main.scss';
</style>
