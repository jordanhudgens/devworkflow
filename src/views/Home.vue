<template>
  <div class="home">
    <SignIn />
    <Register />
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
