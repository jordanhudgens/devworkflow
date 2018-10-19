<template>
  <div @mouseover="toggleArchiveLink" @mouseout="toggleArchiveLink" class="project-card">
    <div class="metadata">
      <div class='title'>
        {{ project.title }}
      </div>

      <p>There are currently {{ countLinks }} links</p>

      <button v-on:click="removeLinks(index)" class="rm">Remove</button>

      <hr>

      <button v-on:click="removeAllLinks">Remove all links</button>

      <form @submit.prevent="addLink">
        <input class="link-input" type="text" placeholder="Add a Link" v-model="newLink" />
      </form>

      <div class="main-objective">
        {{ project.main_objective }}
      </div>
    </div>

    <div class="line-items">
      <a v-for="(title, idx) in lineItemTitles" :key="idx" class="small-link" @click.prevent="setSelectedProjectItemTitle(title)">
        <div class="line-item">
          <span :class="lineItemStatusIcon(title)"></span>
          <span class="title">
            {{ title }}
          </span>
        </div>
      </a>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios';

export default {
  name: 'ProjectCard',

  data() {
    return {
      showArchiveLink: false,
      newLink: null,
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
    ...mapGetters([
      'countLinks'
    ]),

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
      'ADD_LINK',
      'SET_SELECTED_PROJECT_ITEM_TITLE'
    ]),
    setSelectedProjectItemTitle: function(title) {
      console.log("Title", title);
      this.showDetails(title);
      this.SET_SELECTED_PROJECT_ITEM_TITLE(title)
    },
    addLink: function() {
      this.ADD_LINK(this.newLink)
      this.newLink = ''
    },

    ...mapActions([                  // Add this
      'removeLink'
    ]),
    removeLinks: function(link) {    // Add this
      this.removeLink(link)
    },

    ...mapMutations(['REMOVE_ALL']),
    ...mapActions(['removeAll']),
    removeAllLinks() {
      this.removeAll().then(() => {
        this.msg = 'They have been removed'
      });
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

    showDetails(title) {
      this.$emit("showCardDetails", { title: title, projectId: this.project.id });
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