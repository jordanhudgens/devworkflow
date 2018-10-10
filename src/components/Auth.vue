<template>
  <div class="project-cards-wrapper">
    <div class="project-card auth-card">
      <div class="metadata">
        <div class='title'>
          {{ formattedTitle }}
        </div>

        <div class="small-green-line"></div>
      </div>

      <div class="auth-form">
        <form @submit.prevent="handleFormSubmission" class="form-wrapper">
          <div class="input-elements">
            <div v-if="formType === 'register'" class="form-element-group">
              <label for="register-name">Name</label>
              <input type="text" :id="formType + '-name'" v-model="user.name" class="full-width-element">
            </div>

            <div class="form-element-group">
              <label :for="formType + '-email'">Email</label>
              <input type="email" :id="formType + '-email'" v-model="user.email" class="full-width-element">
            </div>

            <div class="form-element-group">
              <label :for="formType + '-password'">Password</label>
              <input type="password" :id="formType + '-password'" v-model="user.password" class="full-width-element">
            </div>
          </div>

          <div class="form-buttons-wrapper">
            <div class="link-btn btn-primary">
              <button type="submit">{{ formattedTitle }}</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',

  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      }
    }
  },

  props: {
    formType: String
  },

  computed: {
    formattedTitle: function() {
      return this.formType[0].toUpperCase() + this.formType.slice(1);
    }
  },

  methods: {
    handleFormSubmission() {
      if (this.formType === 'login') {
        this.loginUser();
      } else {
        this.registerUser();
      }
    },

    registerUser() {
      axios
        .post(
        'https://devworkflow-api.herokuapp.com/registrations',
        {
          user: {
            email: this.user.email,
            name: this.user.name,
            password: this.user.password,
            password_confirmation: this.user.password,
          },
        },
        { withCredentials: true },
      )
        .then(response => {
          console.log("register res", response.data);
          this.$emit('register', response.data);
        })
        .catch(error => {
          this.$emit('registrationError', error);
        });
    },

    loginUser() {
      axios
        .post(
        'https://devworkflow-api.herokuapp.com/sessions',
        {
          user: {
            email: this.user.email,
            password: this.user.password,
          },
        },
        { withCredentials: true },
      )
        .then(response => {
          console.log("login res", response.data);
          this.$emit('login', response.data);
        })
        .catch(error => {
          console.log("error", error);
          this.$emit('authError', error);
        });
    },

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