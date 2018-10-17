<template>
  <modal name="new-project" class="new-project-modal">
    <div class="title">New Project Info</div>
    <div class="small-green-line"></div>

    <div class="spacer30"></div>

    <form @submit.prevent="createNewProject" class="form-wrapper">
      <div>
        <input type="text" v-model="newProject.title" :maxlength="validationRules.title" placeholder="Title" class="full-width-element">
        <div class="text-countdown" v-if="newProject.title" v-text="(validationRules.title - newProject.title.length) + ' characters left'"></div>
        <div class="text-countdown" v-else>{{ validationRules.title }} characters max</div>
      </div>

      <div>
        <input type="text" v-model="newProject.main_objective" :maxlength="validationRules.mainObjective" placeholder="Main objective" class="full-width-element">
        <div class="text-countdown" v-if="newProject.main_objective" v-text="(validationRules.mainObjective - newProject.main_objective.length) + ' characters left'"></div>
        <div class="text-countdown" v-else>{{ validationRules.mainObjective }} characters max</div>
      </div>

      <div class="spacer50"></div>

      <div class="form-buttons-wrapper">
        <div class="link-btn btn-cancel">
          <button @click.prevent="closeModal">Cancel</button>
        </div>

        <div class="link-btn btn-primary">
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  </modal>
</template>

<script>
import axios from 'axios';

export default {
  name: "NewProject",

  data() {
    return {
      newProject: {},
      validationRules: {
        mainObjective: 130,
        title: 55
      }
    }
  },

  props: {
    activeModal: Boolean
  },

  watch: {
    activeModal: function(newVal, oldVal) {
      if (newVal) {
        this.newProjectModal();
      }

      this.$emit('resetActiveModal', 'reset');
    }
  },

  methods: {
    newProjectModal() {
      this.$modal.show('new-project');
    },

    closeModal() {
      this.newProject = {};
      this.$modal.hide('new-project');
    },

    createNewProject() {
      axios
        .post(
        'https://devworkflow-api.herokuapp.com/projects',
        {
          project: {
            title: this.newProject.title,
            main_objective: this.newProject.main_objective,
          },
        },
        { withCredentials: true },
      )
        .then(response => {
          this.$emit('addNewProject', response.data.project);
          this.closeModal();
        })
        .catch(error => {
          console.log('errorrr', error);
        });
    },

  }
}
</script>
