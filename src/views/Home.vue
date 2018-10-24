<template>
  <div class="home">
    <div class="left-column">
      <h1>DevWorkflow</h1>

      <p>A simple program to stay organized as a software engineer</p>

      <p>Login or sign up to get started</p>
    </div>

    <div class="right-column">
      <Auth formType="login" @login="handleSuccessfulAuth" />
      <Auth formType="register" @register="handleSuccessfulAuth" />
    </div>
  </div>
</template>

<script>
import Auth from '@/components/Auth'
import { mapMutations } from 'vuex';

export default {
  name: 'home',

  components: {
    Auth,
  },

  methods: {
    ...mapMutations([
      'SET_CURRENT_USER',
      'SET_LOGIN_STATUS'
    ]),

    handleSuccessfulAuth(user) {
      this.SET_CURRENT_USER(user);
      this.SET_LOGIN_STATUS('LOGGED_IN');
      this.$router.push({
        name: 'ProjectDashboard',
      });
    }
  }
}
</script>