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

    <Footer />
  </div>
</template>

<script>
import Auth from '@/components/Auth'
import Footer from '@/components/Footer'

export default {
  name: 'home',

  components: {
    Auth
  },

  methods: {
    handleSuccessfulAuth() {
      this.$router.push({
        name: 'ProjectDashboard',
      });
    }
  }
}
</script>