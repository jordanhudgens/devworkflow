<template>
  <div class="project-cards-wrapper">
    <div class="project-card auth-card">
      <div class="metadata">
        <div class='title'>
          Register
        </div>

        <div class="small-green-line"></div>
      </div>

      <div class="auth-form">
        <form @submit.prevent="register" class="form-wrapper">
          <div>
            <label for="register-name">Name</label>
            <input type="text" id="register-name" v-model="user.name" placeholder="Name" class="full-width-element">
          </div>

          <div>
            <label for="register-email">Email</label>
            <input type="email" id="register-email" v-model="user.email" placeholder="Email" class="full-width-element">
          </div>

          <div>
            <label for="register-password">Password</label>
            <input type="password" id="register-password" v-model="user.password" placeholder="Password" class="full-width-element">
          </div>

          <div class="spacer50"></div>

          <div class="form-buttons-wrapper">
            <div class="link-btn btn-primary">
              <button type="submit">Register</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import url('./../styles/project-card.scss');
@import url('./../styles/forms.scss');
@import url('./../styles/helpers.scss');
@import url('./../styles/buttons.scss');
@import url('./../styles/auth.scss');
@import url('./../styles/forms.scss');
</style>