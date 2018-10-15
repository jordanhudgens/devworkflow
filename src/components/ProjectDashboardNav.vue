<template>
  <div class="fixed-nav-container">
    <div class="header-logo">
      Dev Workflow
    </div>

    <div class="project-nav">
      <div class="left">
        <a class="link" @click.prevent="toggleStatus">
          {{ statusLinkText }}
        </a>
      </div>

      <div class="right">
        <a class="link" @click.prevent="signOut">
          <span class="logout-link">Logout</span>
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectDashboardNav',

  data() {
    return {
    }
  },

  props: {
    statusLinkText: String
  },

  methods: {
    signOut() {
      axios
        .delete(`https://devworkflow-api.herokuapp.com/logout`, {
          withCredentials: true,
        })
        .then(response => {
          this.$router.push({
            name: 'home',
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    toggleStatus() {
      this.$emit('toggle');
    },
  }
}
</script>