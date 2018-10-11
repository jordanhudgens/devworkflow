<template>
  <div class="project-dashboard-wrapper">
    <NewProject :activeModal="activeModal" @addNewProject="addNewProject" @resetActiveModal="resetActiveModal" />

    <ProjectDashboardNav :statusLinkText="statusLinkText" @toggle="toggleStatus" />

    <div class="project-cards-wrapper">
      <div class="new-project" @click="newProjectModal">
        <div class='title'>New Project</div>

        <div class="icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>

      <div v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" @archiveProject="archiveProject" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NewProject from '@/components/NewProject';
import ProjectDashboardNav from '@/components/ProjectDashboardNav';
import ProjectCard from '@/components/ProjectCard';

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
    NewProject,
    ProjectDashboardNav,
    ProjectCard
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

    archiveProject(projectId) {
      this.projects = this.projects.filter(project => {
        if (project.id != projectId) {
          return project;
        }
      })
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