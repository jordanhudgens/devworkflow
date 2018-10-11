<template>
  <div class="project-dashboard-wrapper">
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

    <div class="fixed-nav-container">
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

    <div class="project-cards-wrapper">
      <div class="new-project" @click="newProjectModal">
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
      newProject: {},
      projects: [],
      validationRules: {
        mainObjective: 130,
        title: 55
      }
    }
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

    getArchivedProjects() {
      axios
        .get(`https://devworkflow-api.herokuapp.com/archived_projects`, { withCredentials: true })
        .then(response => {
          this.projects.push(...response.data.projects);
        })
        .catch(error => {
          console.log(error);
        });
    },

    getProjects() {
      axios
        .get(`https://devworkflow-api.herokuapp.com/projects`, { withCredentials: true })
        .then(response => {
          this.projects.push(...response.data.projects);
        })
        .catch(error => {
          console.log(error);
        });
    },

    newProjectModal() {
      this.$modal.show('new-project');
    },

    closeModal() {
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
          console.log("new project response", response);
          this.projects.unshift(this.newProject);
          this.newProject = {};
          this.closeModal();
        })
        .catch(error => {
          console.log('errorrr', error);
        });
    },

    toggleStatus() {
      this.projects = [];

      if (this.statusLinkText === 'Archived') {
        this.getArchivedProjects();
        this.statusLinkText = 'Active';
      } else {
        this.getProjects();
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