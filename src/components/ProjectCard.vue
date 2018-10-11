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
      <a v-if="showArchiveLink" class="archive-link" @click.prevent="archiveProject(project.id)">
        Archive Project
      </a>
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

  methods: {
    toggleArchiveLink() {
      if (this.showArchiveLink) {
        this.showArchiveLink = false;
      } else {
        this.showArchiveLink = true;
      }
    },

    archiveProject(projectId) {
      axios
        .patch(
        `https://devworkflow-api.herokuapp.com/archived_projects/${projectId}`,
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