<template>
  <div class="project-details-card">
    <div class="card-header">
      <div class="title">
        {{ selectedItemTitle }}
      </div>

      <div class="action-icons">
        <div class="update-icon">
          <a @click.prevent="updateLineItem">
            <i class="fas fa-save"></i>
          </a>
        </div>

        <div class="close-icon">
          <a @click.prevent="closeCard">
            <i class="fas fa-times-circle"></i>
          </a>
        </div>
      </div>
    </div>

    <div v-if="loading">
      <i class="fas fa-spinner"></i>
    </div>

    <div v-else-if="selectedProjectLineItem">
      <div class="card-details-description" @click.prevent="editDescription">
        <div v-if="selectedProjectLineItem.description">
          {{ selectedProjectLineItem.description }}
        </div>

        <div v-else>
          Description goes here
        </div>

      </div>

      <div class="status">
        <p-check class="p-switch p-fill" color="success" v-model="selectedProjectLineItem.completed">Completed?</p-check>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectCardDetails',

  data() {
    return {
      updateLineItemUrl: "https://devworkflow-api.herokuapp.com/project_line_items/",
      loading: true,
      selectedProjectLineItem: {},
    }
  },

  beforeMount() {
    this.setSelectedItem();
  },

  beforeUpdate() {
    this.setSelectedItem();
  },

  props: {
    selectedItemTitle: String,
    project: Object
  },

  methods: {
    editDescription() {
      console.log("Editttinggg")
    },

    setSelectedItem() {
      this.selectedProjectLineItem = this.project.project_line_items.find(pli => {
        return pli.title === this.selectedItemTitle
      });
      this.loading = false;
    },

    closeCard() {
      this.$emit("closeCard");
    },

    updateLineItem() {
      axios
        .patch(
        this.updateLineItemUrl + this.selectedProjectLineItem.id,
        {
          project_line_item: {
            description: "Updated content...",
            completed: this.selectedProjectLineItem.completed
          }
        },
        { withCredentials: true },
      )
        .then(response => {
          this.$emit('updateProjectLineItem', response.data);
          this.closeCard();
        })
        .catch(error => {
          console.log('errorrr', error);
        });
    }
  }
}
</script>