<template>
  <div class="project-dashboard-wrapper">
    <NewProject :activeModal="activeModal" @addNewProject="addNewProject" @resetActiveModal="resetActiveModal" />

    <ProjectDashboardNav :statusLinkText="getStatusLinkText" @toggle="toggleStatus" />

    <div class="project-cards-wrapper">
      <div class="new-project" @click="newProjectModal" v-if="getStatusLinkText === 'Archived'">
        <div class='title'>New Project</div>

        <div class="icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>

      <div v-if="currentProjectLoadingStatus" class="retrieved-project-cards">
        <div v-for="project in getProjects" :key="project.id" class="project-card-and-detail-wrapper">
          <ProjectCard :project="project" @handleProjectStatusChange="handleProjectStatusChange" @showCardDetails="handleCardLineItemClick" />
          <transition name="fade">
            <ProjectCardDetails v-if="shouldExpandCard(project.id)" :project="project" @updateProjectLineItem="updateProjectLineItem" />
          </transition>
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
      'getProjects',
      'getStatusLinkText'
    ]),

    ...mapState([
      'projects',
      'projectsLoaded'
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_SELECTED_PROJECT_ITEM',
      'SET_STATUS_LINK_TEXT',
      'SET_PROJECT_API_URL',
      'REMOVE_FROM_PROJECT_LIST',
      'ADD_TO_PROJECTS',
      'SET_LOADING_STATUS'
    ]),

    ...mapActions([
      'retrieveProjects'
    ]),

    setSelectedProjectItem() {
      this.SET_SELECTED_PROJECT_ITEM(projectItem)
    },

    updateProjectLineItem(res) {
      const projectId = res.project_line_item.project.id;

      for (let project of this.getProjects()) {
        if (project.id === projectId) {
          project.project_line_items = project.project_line_items.filter(pli => pli.id !== res.project_line_item.id);
          project.project_line_items.push(res.project_line_item)
        }
      };
    },

    handleCardLineItemClick(res) {
      this.getProjects().forEach(project => {
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

    shouldExpandCard(projectId) {
      if (this.currentProjectItem && projectId === this.currentProjectItem.project_id) {
        return true;
      } else {
        return false;
      }
    },

    addNewProject(project) {
      this.ADD_TO_PROJECTS(project);
    },

    resetActiveModal(data) {
      this.activeModal = false;
    },

    newProjectModal() {
      this.activeModal = true;
    },

    handleProjectStatusChange(projectToRemove) {
      this.REMOVE_FROM_PROJECT_LIST(projectToRemove);
    },

    getArchivedProjects() {
      this.retrieveProjects();
    },

    toggleStatus() {
      this.SET_LOADING_STATUS(true);

      if (this.getStatusLinkText === 'Archived') {
        this.SET_PROJECT_API_URL('ARCHIVE');
        this.SET_STATUS_LINK_TEXT('Active');
      } else {
        this.SET_PROJECT_API_URL('ACTIVE');
        this.SET_STATUS_LINK_TEXT('Archived');
      }

      this.SET_LOADING_STATUS(false);

      if (!this.currentProjectLoadingStatus) {
        this.retrieveProjects();
      }
    },
  }
}
</script>