<template>
  <div @mouseover="toggleArchiveLink" @mouseout="toggleArchiveLink" class="project-card">
    <div class="metadata">
      <div class='title'>
        {{ project.title }}
      </div>

      <div class="main-objective">
        {{ project.main_objective }}
      </div>
    </div>

    <div class="line-items">
      <div v-for="(title, idx) in lineItemTitles" :key="idx">
        <a class="small-link" @click.prevent="setSelectedProjectItem(project, title)">
          <div class="line-item">
            <span :class="lineItemStatusIcon(title)"></span>
            <span class="title">
              {{ title }}
            </span>
          </div>
        </a>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showArchiveLink" class="status-action-links-wrapper">
        <a class="delete-link" @click.prevent="deleteProject">
          <i class="fas fa-times"></i>
          <span class="title">
            Delete
          </span>
        </a>

        <a class="archive-link" @click.prevent="toggleProjectStatus">
          <i class="fas fa-archive"></i>
          <span class="title">
            {{ archiveActionText }}
          </span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'ProjectCard',

  data() {
    return {
      showArchiveLink: false,
      lineItemTitles: [
        "Wireframes",
        "Sitemap",
        "User Stories",
        "UML Diagrams",
        "Hi-Res Designs",
        "Logo/Images",
        "Frontend Implementation",
        "Backend API",
        "Automated Tests",
        "Deployment"
      ]
    }
  },

  props: {
    project: Object
  },

  computed: {
    archiveApiUrl: function() {
      if (this.project.status === 'active') {
        return `https://devworkflow-api.herokuapp.com/archived_projects/${this.project.id}`
      } else {
        return `https://devworkflow-api.herokuapp.com/unarchive_projects/${this.project.id}`
      }
    },

    archiveActionText: function() {
      if (this.project.status === 'active') {
        return 'Archive';
      } else {
        return 'Unarchive';
      }
    }
  },

  methods: {
    ...mapMutations([
      'SET_SELECTED_PROJECT_ITEM',
    ]),

    setSelectedProjectItem(project, title) {
      const payload = { selectedProject: project, title: title };
      this.SET_SELECTED_PROJECT_ITEM(payload);
    },

    lineItemStatusIcon(lineItemTitle) {
      const projectLineItems = this.project.project_line_items;

      if (projectLineItems.length > 0) {
        for (let lineItem of projectLineItems) {
          if ((lineItem.title === lineItemTitle) && (lineItem.completed === true)) {
            return 'completed-circle'
          }
        }
      }

      return 'incompleted-circle';
    },

    toggleArchiveLink() {
      if (this.showArchiveLink) {
        this.showArchiveLink = false;
      } else {
        this.showArchiveLink = true;
      }
    },

    deleteProject() {
      this.$swal({
        title: 'Are you sure you want to delete this project?',
        text:
        "This will permanently delete the project and you won't be able to get it back",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then(result => {
        if (result.value) {
          axios
            .delete(`https://devworkflow-api.herokuapp.com/projects/${this.project.id}`,
            { withCredentials: true }
            )
            .then(response => {
              this.$emit('handleProjectStatusChange', this.project.id);
              return response.data;
            })
            .catch(error => {
              console.log(error);
            });
          this.$swal('Deleted', 'You successfully deleted the project', 'success');
        } else {
          this.$swal('Cancelled', 'Your project is still intact!', 'info');
        }
      });
    },

    toggleProjectStatus() {
      axios
        .patch(
        this.archiveApiUrl,
        {},
        { withCredentials: true },
      )
        .then(response => {
          this.$emit('handleProjectStatusChange', this.project.id);
        })
        .catch(error => {
          console.log('errorrr', error);
        });
    },

  }
}
</script>