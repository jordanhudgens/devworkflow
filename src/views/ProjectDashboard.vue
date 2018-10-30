<template>
  <div class="project-dashboard-wrapper">
    <NewProject :activeModal="activeModal" @addNewProject="addNewProject" @resetActiveModal="resetActiveModal" />

    <ProjectDashboardNav :statusLinkText="statusLinkText" @toggle="toggleStatus" />

    <h1>{{currentProjectLoadingStatus}}</h1>

    <div class="project-cards-wrapper">
      <div class="new-project" @click="newProjectModal" v-if="statusLinkText === 'Archived'">
        <div class='title'>New Project</div>

        <div class="icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>

      <!-- TODO Fix the class wrapper so the cards show to the side instead of on top of each other  -->
      <div v-if="currentProjectLoadingStatus">
        <div v-for="project in getProjects" :key="project.id">
          <div class="project-card-and-detail-wrapper">
            <ProjectCard :project="project" @handleProjectStatusChange="handleProjectStatusChange" @showCardDetails="handleCardLineItemClick" />
            <transition name="fade">
              <ProjectCardDetails v-if="shouldExpandCard(project.id)" :project="project" @closeCard="closeCard" @updateProjectLineItem="updateProjectLineItem" />
            </transition>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import NewProject from '@/components/NewProject';
import ProjectDashboardNav from '@/components/ProjectDashboardNav';
import ProjectCard from '@/components/ProjectCard';
import ProjectCardDetails from '@/components/ProjectCardDetails';
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'ProjectDashboard',

  beforeMount() {
    this.retrieveProjects();
  },

  data() {
    return {
      statusLinkText: 'Archived',
      activeModal: false,
    }
  },

  components: {
    NewProject,
    ProjectDashboardNav,
    ProjectCard,
    ProjectCardDetails,
  },

  computed: {
    ...mapGetters([
      'currentProjectItem',
      'currentProjectLoadingStatus',
      'getProjects'
    ]),

    ...mapState([
      'projects',
      'projectsLoaded'
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_SELECTED_PROJECT_ITEM',
      'CLEAR_SELECTED_PROJECT_ITEM'
    ]),

    ...mapActions([
      'retrieveProjects'
    ]),

    setSelectedProjectItem: function(projectItem) {
      this.SET_SELECTED_PROJECT_ITEM(projectItem)
    },

    clearSelectedProjectItem: function(projectItem) {
      this.CLEAR_SELECTED_PROJECT_ITEM()
    },

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
      this.projects.forEach(project => {
        if (project.id === res.projectId) {
          project.project_line_items.forEach(pli => {
            if (pli.title === res.title) {
              this.setSelectedProjectItem(pli);
            }
          })
        }
      })

      this.shouldExpandCard(res.projectId);
    },

    closeCard() {
      this.clearSelectedProjectItem();
    },

    shouldExpandCard(projectId) {
      if (this.currentProjectItem && projectId === this.currentProjectItem.project_id) {
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