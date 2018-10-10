<template>
  <div v-if="!isLoading" id="app">
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
        } else {
          this.$router.push({
            name: 'home',
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
