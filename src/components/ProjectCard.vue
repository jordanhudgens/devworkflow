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

export default {
  name: 'ProjectCard',

  data() {
    return {
      showArchiveLink: false,
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
            .delete(`https://devworkflow-api.herokuapp.com/projects/${plan.slug}`, {},
            { withCredentials: true }
            )
            .then(response => {
              console.log("Deleting response", response);
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
    }
  }
}
</script>