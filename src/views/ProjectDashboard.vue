<template>
  <div class="project-dashboard-wrapper">
    <NewProject :activeModal="activeModal" @addNewProject="addNewProject" @resetActiveModal="resetActiveModal" />

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

          <div class="line-item">
            <span class="completed-circle"></span>
            <span class="title">
              Wireframes
            </span>
          </div>

          <div class="line-item">
            <span class="incompleted-circle"></span>
            <span class="title">
              Sitemap
            </span>
          </div>

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
import NewProject from '@/components/NewProject';

export default {
  name: 'ProjectDashboard',

  mounted() {
    this.getProjects();
  },

  data() {
    return {
      statusLinkText: 'Archived',
      projects: [],
      activeModal: false
    }
  },

  components: {
    NewProject
  },

  methods: {
    addNewProject(project) {
      this.projects.unshift(project);
    },

    resetActiveModal(data) {
      this.activeModal = false;
    },

    newProjectModal() {
      this.activeModal = true;
    },

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