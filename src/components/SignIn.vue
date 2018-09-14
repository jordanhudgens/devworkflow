<template>
  <div class="project-cards-wrapper">
    <div class="project-card auth-card">
      <div class="metadata">
        <div class='title'>
          Login
        </div>

        <div class="small-green-line"></div>
      </div>

      <div class="auth-form">
        <form @submit.prevent="login" class="form-wrapper">
          <div>
            <label for="email">Email</label>
            <input type="text" id="email" v-model="user.email" placeholder="Email" class="full-width-element">
          </div>

          <div>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="user.password" placeholder="Password" class="full-width-element">
          </div>

          <div class="spacer50"></div>

          <div class="form-buttons-wrapper">
            <div class="link-btn btn-primary">
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      user: {
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