<template>
  <div>
    <modal name="new-project" class="new-project-modal">
      <div class="title">New Project Info</div>
      <div class="small-green-line"></div>

      <div class="spacer30"></div>

      <form @submit.prevent="createNewProject" class="form-wrapper">
        <div>
          <input type="text" v-model="project.title" placeholder="Title" class="full-width-element">
        </div>

        <div>
          <input type="text" v-model="project.main_objective" placeholder="Main objective" class="full-width-element">
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

    <a class="link" @click.prevent="toggleStatus">
      {{ statusLinkText }}
    </a>

    <div class="project-cards-wrapper">
      <div class="new-project" @click="newProject">
        <div class='title'>New Project</div>

        <div class="icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>

      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="metadata">
          <div class='title'>
            {{ project.title }}
          </div>

          <div class="main-objective">
            {{ project.main_objective }}
          </div>
        </div>

        <div class="line-items">
          <div class="line-item">Wireframes</div>
          <div class="line-item">Sitemap</div>
          <div class="line-item">User Stories</div>
          <div class="line-item">UML Diagrams</div>
          <div class="line-item">Hi-Res Designs</div>
          <div class="line-item">Logo/Images</div>
          <div class="line-item">Frontend Implementation</div>
          <div class="line-item">Backend API</div>
          <div class="line-item">Automated Tests</div>
          <div class="line-item">Deployment</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectDashboard',

  mounted() {
    this.getProjects();
  },

  data() {
    return {
      statusLinkText: 'Archived',
      project: {},
      projects: []
    }
  },
  methods: {
    getProjects() {
      console.log("Getting projects...")
      axios
        .get(`https://devworkflow-api.herokuapp.com/projects`, { withCredentials: true })
        .then(response => {
          this.projects.push(...response.data.projects);
        })
        .catch(error => {
          console.log(error);
        });
    },

    newProject() {
      this.$modal.show('new-project');
    },

    closeModal() {
      this.$modal.hide('new-project');
    },

    createNewProject() {
      console.log('Creating new project');
      this.closeModal();
    },

    toggleStatus() {
      if (this.statusLinkText === 'Archived') {
        this.statusLinkText = 'Active';
      } else {
        this.statusLinkText = 'Archived';
      }
    },
  }
}
</script>

<style lang="scss">
@import url('./../styles/project-dashboard.scss');
@import url('./../styles/project-card.scss');
@import url('./../styles/modal.scss');
@import url('./../styles/forms.scss');
@import url('./../styles/helpers.scss');
@import url('./../styles/buttons.scss');
</style>