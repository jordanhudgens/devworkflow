<template>
  <div class="project-dashboard-wrapper">
    <NewProject :activeModal="activeModal" @addNewProject="addNewProject" @resetActiveModal="resetActiveModal" />

    <ProjectDashboardNav :statusLinkText="statusLinkText" @toggle="toggleStatus" />

    <div class="project-cards-wrapper">
      <div class="new-project" @click="newProjectModal" v-if="statusLinkText === 'Archived'">
        <div class='title'>New Project</div>

        <div class="icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>

      <div v-for="project in projects" :key="project.id">
        <div class="project-card-and-detail-wrapper">
          <ProjectCard :project="project" @handleProjectStatusChange="handleProjectStatusChange" @showCardDetails="handleCardLineItemClick" />
          <ProjectCardDetails v-if="shouldExpandCard(project.id)" :project="project" :selectedItemTitle="selectedLineItem.title" @closeCard="closeCard" @updateProjectLineItem="updateProjectLineItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NewProject from '@/components/NewProject';
import ProjectDashboardNav from '@/components/ProjectDashboardNav';
import ProjectCard from '@/components/ProjectCard';
import ProjectCardDetails from '@/components/ProjectCardDetails';

export default {
  name: 'ProjectDashboard',

  mounted() {
    this.getProjects();
  },

  data() {
    return {
      statusLinkText: 'Archived',
      projects: [],
      activeModal: false,
      selectedLineItem: {
        title: null,
        projectId: null
      }
    }
  },

  components: {
    NewProject,
    ProjectDashboardNav,
    ProjectCard,
    ProjectCardDetails
  },

  methods: {
    updateProjectLineItem(res) {
      const projectId = res.project_line_item.project.id;

      for (let project of this.projects) {
        if (project.id === projectId) {
          project.project_line_items = project.project_line_items.filter(pli => pli.id !== res.project_line_item.id);
          project.project_line_items.push(res.project_line_item)
        }
      };
    },

    handleCardLineItemClick(res) {
      this.selectedLineItem.title = res.title;
      this.selectedLineItem.projectId = res.projectId;
    },

    closeCard() {
      this.selectedLineItem.title = null;
      this.selectedLineItem.projectId = null;
    },

    shouldExpandCard(projectId) {
      if (projectId === this.selectedLineItem.projectId) {
        return true;
      } else {
        return false;
      }
    },

    addNewProject(project) {
      this.projects.unshift(project);
    },

    resetActiveModal(data) {
      this.activeModal = false;
    },

    newProjectModal() {
      this.activeModal = true;
    },

    handleProjectStatusChange(projectId) {
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