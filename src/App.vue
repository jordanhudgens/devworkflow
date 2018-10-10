<template>
  <div v-if="!isLoading" id="app">
    <div id="nav">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/dashboard">Project Dashboard</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
import loggedIn from '@/helpers/loggedIn';

export default {
  name: "App",

  data() {
    return {
      isLoading: true
    }
  },

  beforeMount() {
    this.checkLogin();
  },

  methods: {
    checkLogin() {
      loggedIn().then(res => {
        if (res.logged_in) {
          this.$router.push({
            name: 'ProjectDashboard',
          });
        }

        this.isLoading = false;
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>


<style lang="scss">
@import url('./styles/common.scss');
</style>
