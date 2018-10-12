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
      <pre>Status: {{ project }}</pre>

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
            Archive
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
      showArchiveLink: false
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
      console.log('Deleting project...')
    },

    toggleProjectStatus() {
      axios
        .patch(
        this.archiveApiUrl,
        {},
        { withCredentials: true },
      )
        .then(response => {
          this.$emit('archiveProject', projectId);
        })
        .catch(error => {
          console.log('errorrr', error);
        });
    }
  }
}
</script>