<template>
  <div class="home">
    <div class="left-column">
      <h1>DevWorkflow</h1>

      <p>A simple program to stay organized as a software engineer</p>

      <p>Login or sign up to get started</p>
    </div>

    <div class="right-column">
      <SignIn />
      <Register />
    </div>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    SignIn,
    Register
  }
}
</script>

<style scoped>
@import url('./../styles/home.scss');
</style>