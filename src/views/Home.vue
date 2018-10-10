<template>
  <div class="home">
    <div class="left-column">
      <h1>DevWorkflow</h1>

      <p>A simple program to stay organized as a software engineer</p>

      <p>Login or sign up to get started</p>
    </div>

    <div class="right-column">
      <Auth formType="login" @register="handleSuccessfulAuth" />
      <Auth formType="register" @login="handleSuccessfulAuth" />
    </div>
  </div>
</template>

<script>
import Auth from '@/components/Auth'

export default {
  name: 'home',

  components: {
    Auth
  },

  methods: {
    handleSuccessfulAuth() {
      console.log("Logging in!!!")
    }
  }
}
</script>

<style scoped lang="scss">
@import url('./../styles/home.scss');
</style>